import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from '../../../Redux/action/apiProductsAction';
import ProductCard from './innerPage/ProductCard';

const ClientProduct = () => {
  const products = useSelector(state => state.apiProductsReducer.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem('sellingProducts')) {
      localStorage.setItem('sellingProducts', JSON.stringify([]))
    }
    dispatch(getApiData());
  }, []);

  return (
    <div>
      {products.map(({ id, name, price, urlImage }, index) => (
        <ProductCard key={id} id={id} photo={urlImage} name={name} price={price} index={index} />
      ))}
    </div>
  )
}


export default ClientProduct