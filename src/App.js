import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';


function App() {

  const dispatch = useDispatch();

  const data = useSelector(state => state.data)

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
          <div>{
              data?.length > 0 && data.map(person => (
                <PersonCard data={person} key={person.name}/>
              ))
            }</div>
      </div>
    </div>
  );
}


const PersonCard = ({data}) => {
  
  return (
    <div className="card">
      <div>{data.name}</div>
      {/* <div>{data.homeworld}</div> */}
      {/* <div>{data.films}</div> */}
    </div>
  )
}

export default App;
