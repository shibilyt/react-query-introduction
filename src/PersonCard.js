import React from 'react';

export default function PersonCard({data}){
      
    return (
        <div className="card">
            <div>{data.name}</div>
        </div>
    )
}