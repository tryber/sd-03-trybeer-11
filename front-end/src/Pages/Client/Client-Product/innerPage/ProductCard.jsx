import React, { useEffect, useState } from 'react';
import PlusMinus from './PlusMinus';

const ProductCard = (props) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);
  const [operator, setOperator] = useState('');
  const [quantity, setQuantity] = useState(0);

  const { id, name, price, photo, index } = props;

  useEffect(() => {
    if (sellingQuantity !== 0) {
      const arr = JSON.parse(localStorage.getItem('sellingProducts'));
      
      if (arr.length === 0 || !arr.some((product) => product.id === id)) {
        arr.push({ id, sellingQuantity });
        localStorage.setItem('sellingProducts', JSON.stringify(arr));

        const localStorageSell = JSON.parse(localStorage.getItem('sellingProducts'));
        const productQuantity = localStorageSell.find((product) => product.id === id) || 0;
        return setQuantity(productQuantity);
      }
      
      const newArr = arr.map((product) => {
        if (product.id === id) {
          return { id, sellingQuantity: eval(`${product.sellingQuantity} ${operator} ${1}`) };
        }
        return product;
      })
      localStorage.setItem('sellingProducts', JSON.stringify(newArr));

    }
    const localStorageSell = JSON.parse(localStorage.getItem('sellingProducts'));
    const productQuantity = localStorageSell.find((product) => product.id === id) || 0;
    setQuantity(productQuantity);
  }, [sellingQuantity]);

  return (
    <div>
      <section>
        <span data-testid={`${index}-product-price`}>{price}</span>
        <img data-testid={`${index}-product-img`} url={photo} alt="Cerveja" />
        <h4 data-testid={`${index}-product-name`}>{name}</h4>
        <PlusMinus sellingQuantity={sellingQuantity} index={index} id={id} setSellingQuantity={setSellingQuantity} setOperator={setOperator} />
        {quantity.sellingQuantity || quantity}
      </section>
    </div>
  )
}

export default ProductCard;
