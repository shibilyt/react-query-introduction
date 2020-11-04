import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';

// reducer section

const initialState = {
    data: null,
}

function reducer(state = initialState, action){

    switch (action.type) {

        case 'api/success':
            return {
                ...state,
                data: action.payload.data,
            }
        
        default:
            return state;
    }
}




// get data api

function getData(){
  return axios.get('https://swapi.dev/api/people').then(res => res.data.results)
}

// saga section

function* fetchData(){
  try {
    const data = yield call(getData);
    yield delay(2000)
    yield put({
      type: 'api/success',
      payload: {
        data
      }
    })
  }
  catch(error) {
  }
}


function* mySaga() {
  yield takeLatest("api/fetch", fetchData);
}


// store creation

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducer, /* preloadedState, */ composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(mySaga)