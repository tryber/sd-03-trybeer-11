import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from '../../../Redux/action/apiProductsAction';
import ProductCard from './innerPage/ProductCard';

const ClientProduct = () => {
  const products = useSelector(state => state.apiProductsReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApiData());
  }, []);

  console.log(products)
  return (
    <div>
      {products.map(({ id, name, price, urlImage }, index) => (
        <ProductCard key={id} id={id} photo={urlImage} name={name} price={price} index={index} />
      ))}
    </div>
  )
}


export default ClientProduct