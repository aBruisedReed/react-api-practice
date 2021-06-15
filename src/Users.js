import React, { useState } from 'react';
import axios from 'axios';
import { useUsersState, useUsersDispatch, getUsers } from './UsersContext';
// import useAsync from './useAsync';
import { useAsync } from 'react-async';
import User from './User';

// async function getUsers() {
//   const response = await axios.get(
//     'https://jsonplaceholder.typicode.com/users'
//   );
//   return response.data;
// }
// react-async 는 axios 가 포함된 것인가

function Users() {
  // const [state, fetchUsers] = useAsync(getUsers, [], true);
  // const { data: users, error, isLoading, run} = useAsync({
  //   deferFn: getUsers
  // });
  const [selected, setSelected] = useState(null);
  // const onClick = (e) => {
  //   setSelected(e.target);
  // }
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  
  const { data: users, loading, error } = state.users;
  const fetchData = () => {
    getUsers(dispatch);
  };

  if(loading) return (<div>Loading...</div>);
  if(error) return <div>Error occur!</div>
  if(!users) return <button onClick={fetchData}>fetchData</button>;
  return (
    <>
      <ul>
        {users.map(user => {
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
      <button onClick={fetchData}>fetchData</button>
      {selected && <User id={selected}></User>}
    </>
  )
}

export default Users;
