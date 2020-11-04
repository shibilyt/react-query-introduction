import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux'
import { ReactQueryDevtools } from 'react-query-devtools'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    <ReactQueryDevtools initialIsOpen={false}/>
  </React.StrictMode>,
  document.getElementById('root')
);