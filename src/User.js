import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);
  const { loading, error, data: user } = state;

  if(state.loading) return (<div>Loading...</div>);
  if(state.error) return <div>Error occur!</div>;
  if(!state.data) return null;

  return (
    <div>
      <h2>{user.username}</h2>
        <p>Email:<b> {user.email}</b></p>
    </div>
  )
}

export default User;
