import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios'


function App() {

  const {data, status} = useQuery('people', () => axios.get('https://swapi.dev/api/people').then(res => res.data.results))
  
  return (
    <div className="App">
      <h1 className="header">
      Swapi with react query
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
