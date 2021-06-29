import React, { useState } from 'react';

export const ListCard = ({ data }) => {

  return (
    <div className="list-card">
      <h1>{data.title}</h1>
      <div>
        {data.list.map((item, i) =>
          <p key={i}>
            <img src={item.icon} alt={item.icon} />
            {item.text}
          </p>
        )}
      </div>
    </div>
  )
}