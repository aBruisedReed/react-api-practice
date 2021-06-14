import React, { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

function Users() {
  const [state, fetchUsers] = useAsync(getUsers, [], true);
  const [selected, setSelected] = useState(null);
  // const onClick = (e) => {
  //   setSelected(e.target);
  // }
  if(state.loading) return (<div>Loading...</div>);
  if(state.error) return <div>Error occur!</div>
  if(!state.data) return <button onClick={fetchUsers}>reload users</button>;
  return (
    <>
      <ul>
        {state.data.map(user => {
          return (
            <li 
              key={user.id} 
              onClick={()=>setSelected(user.id)}
              style={{ cursor: "pointer" }}
            >
              {user.username} ({user.name})
            </li>
          )
        })}
      </ul>
      <button onClick={fetchUsers}>reload users</button>
      {selected && <User id={selected}></User>}
    </>
  )
}

export default Users;
