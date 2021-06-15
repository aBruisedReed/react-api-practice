// import React from 'react';
// import axios from 'axios';
// import useAsync from './useAsync';
//
// async function getUser(id) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }
//
// function User({ id }) {
//   const [state] = useAsync(() => getUser(id), [id]);
//   const { loading, error, data: user } = state;
//
//   if(state.loading) return (<div>Loading...</div>);
//   if(state.error) return <div>Error occur!</div>;
//   if(!state.data) return null;
//
//   return (
//     <div>
//       <h2>{user.username}</h2>
//         <p>Email:<b> {user.email}</b></p>
//     </div>
//   )
// }
//
// export default User;
////////////////////////////////
import React, { useEffect } from 'react';
import axios from 'axios';
// import { useAsync } from 'react-async';
import { useUsersState, useUsersDispatch, getUser } from './UsersContext';

// async function getUser({ id }) {
//   const response = await axios.get(
//     `https://jsonplaceholder.typicode.com/users/${id}`
//   );
//   return response.data;
// }

function User({ id }) {
  // const { data: user, error, isLoading } = useAsync({
  //   promiseFn: getUser,
  //   id,
  //   watch: id //watch는 뭐지? async 옵션? useEffect의 deps 같이 이값이 바뀔 때 함수를 재 호출
  // })
  const state = useUsersState();
  const dispatch = useUsersDispatch();
  useEffect(() => {
    getUser(dispatch, id);
  }, [dispatch, id]);
  const { loading, data: user, error } = state.user;
  // getUser(dispatch, id);
  console.log(state);

  if(loading) return (<div>Loading...</div>);
  if(error) return <div>Error occur!</div>;
  if(!user) return null;

  return (
    <div>
      <h2>{user.username}</h2>
        <p>Email:<b> {user.email}</b></p>
    </div>
  )
}

export default User;

