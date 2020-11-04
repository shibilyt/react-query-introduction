import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch();

  const data = useSelector(state => state.data)
  const status = useSelector(state => state.status)

  useEffect(()=>{
    dispatch({
      type: 'api/fetch'
    })
  },[dispatch])


  return (
    <div className="App">
      <h1 className="header">
      Swapi with redux
      </h1>

      <div>
      {
          status === 'loading' && (
            <div>Loading...</div>
          )
        }
        {
          status === 'error' && (
            <div>Failed</div>
          )
        }
        {
          status === 'success' && (
          <div>{
              data.length > 0 && data.map(person => (
                <PersonCard data={person} key={person.name}/>
              ))
            }</div>
          )
        }
      </div>
    </div>
  );
}


const PersonCard = ({data}) => {
  
  return (
    <div className="card">
      <div>{data.name}</div>
    </div>
  )
}

export default App;
