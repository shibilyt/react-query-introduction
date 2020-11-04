import React, { useState } from 'react';
import {useQuery, useMutation, useQueryCache} from 'react-query'
import {Link} from 'react-router-dom'
import {createServer, Model} from 'miragejs';
import axios from 'axios';
import PersonCard from './PersonCard'

createServer({
    models: {
      user: Model,
    },

    seeds(server) {
        server.create("user", { name: "Ajmal" })
        server.create("user", { name: "Raison" })
        server.create("user", { name: "Muzammil" })
    },

    routes() {
        this.timing = 1500
        
        this.passthrough('https://swapi.dev/api/people/');
        
        this.get("/api/users", (schema) => {
          return schema.users.all()
        })
    
        this.post("/api/users", (schema, request) => {
          let attrs = JSON.parse(request.requestBody)
  
          schema.users.create(attrs)
          return schema.users.all()
        })
    },
  })

export default function Users(){

    const queryCache = useQueryCache();

    const {data, status, isFetching} = useQuery('users', () => axios.get('/api/users').then(res => res.data.users))
    const [mutate, mutateObj] = useMutation(({name}) => axios.post('/api/users',{name}), {
        onSuccess: () => {
            queryCache.invalidateQueries('users')
        }
    })

    const [name, setName] = useState('');

    const handleChange = e => {
        setName(e.target.value)
    }

    const addUser = async () => {
        await mutate({name})
        setName('')
    }

    return (
        <>
          <header className="header">
            <h1>
              mutation with react query
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
                        <div>
                            {
                                // important to note that now, data is given as an array of results
                                data?.length > 0 && data.map(person => (
                                    <PersonCard data={person} key={person.name}/>
                                ))
                            }
                            {
                                isFetching && "..."
                            }

                            <div>
                                <h2>Add User</h2>

                                <div>
                                    <input type="text" onChange={handleChange} value={name}/>
                                    <button className="btn" onClick={addUser}>Add</button>
                                </div>

                            </div>
                        </div>
            
                    )
                }

          </div>


            <div>
            </div>
        </>
    )
}