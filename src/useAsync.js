import { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      }
    default:
      throw new Error(`Unhandled action type:${action.type}`);
  }
}

const defaultState = {
  loading: false,
  data: null,
  error: null
}

function useAsync(callback, deps = [], skip = false) { // 디폴트 파라미터
  const [state, dispatch] = useReducer(reducer, defaultState);
  const fetchData = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await callback();
      dispatch({ type: 'SUCCESS', data: response })
    } catch (e) {
      dispatch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => { // 왜 여기서 호출을 한 번하냐?
    if(skip) return;
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return [state, fetchData];
}

export default useAsync;
