import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from '../../../Redux/action/apiProductsAction';

const ClientProduct = () => {
  const products = useSelector(state => state.apiProductsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiData());
  }, []);

  const addWord = () => {
    dispatch({ type: 'API_RECEIVE_SUCCESS', data: 'lol' })
  }

  console.log(products)
  return (
    <div>
      <div>Hello</div>
      <button onClick={addWord}>Button</button>
    </div>
  )
}


export default ClientProduct