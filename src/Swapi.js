import React from 'react';
import {useInfiniteQuery} from 'react-query'
import axios from 'axios'
import PersonCard from './PersonCard'
import { Link } from 'react-router-dom';

export default function Swapi(){

    const {
        status,
        data,
        isFetching,
        isFetchingMore,
        fetchMore,
        canFetchMore,
      } = useInfiniteQuery('people', (key, cursor = 1) => axios.get(`https://swapi.dev/api/people/?page=${cursor}`).then(res => res.data), {
        getFetchMore: (lastGroup, allGroups) => {
          const page = getParameterByName('page', lastGroup.next);
            return page;
        },
      })
    
      return (
        <>
          <header className="header">
            <h1>
              Swapi with react query
            </h1>
            <Link to='/query'><div> Query </div></Link>
            <Link to='/mutation'><div> Mutation </div></Link>
          </header>
    
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
                // important to note that now, data is given as an array of results
                  data.map((group,i) => 
                  group?.results?.length > 0 && group.results.map(person => (
                    <PersonCard data={person} key={person.name}/>
                  )
                  ))
                }
                
                <button
                className='btn'
               onClick={() => fetchMore()}
               disabled={!canFetchMore || isFetchingMore}
             >
               {isFetchingMore
                 ? 'Loading more...'
                 : canFetchMore
                 ? 'Load More'
                 : 'Nothing more to load'}
             </button>
                </div>
    
              )
            }
            {
              isFetching && '...'
            }
          </div>
        </>
      );
    }
    
    
    function getParameterByName(name, url) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
    