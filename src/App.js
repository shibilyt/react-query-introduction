import './App.css';
import { useState } from 'react';
import { usePaginatedQuery } from 'react-query';
import axios from 'axios'
async function fetchSwapi(_key, page){
  await new Promise(res => setTimeout(res, 1500))

  return axios.get(`https://swapi.dev/api/people?page=${page}`).then(res => res.data)
}

function App() {

  const [page, setPage] = useState(1);
  
  const {resolvedData, latestData, status, isFetching} = usePaginatedQuery(['people', page],fetchSwapi)

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
              resolvedData?.results?.length > 0 && resolvedData.results.map(person => (
                <PersonCard data={person} key={person.name}/>
              ))
            }
            
            <button className="btn" onClick={() => setPage((old) => old - 1)} disabled={page === 1}>prev</button>
            <button className="btn" onClick={() => setPage((old) => old + 1)}
        disabled={!latestData?.next}>next</button>
            </div>

          )
        }
        {
          isFetching && '...'
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


function getParameterByName(name, url) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

export default App;
