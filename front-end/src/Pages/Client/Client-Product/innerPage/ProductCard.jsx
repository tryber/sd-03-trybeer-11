import React, { useEffect, useState } from 'react';
import PlusMinus from './PlusMinus';
import img from './imgTest.jpg'

const ProductCard = (props) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);
  const [operator, setOperator] = useState('');
  const [quantity, setQuantity] = useState(0);

  const { id, name, price, photo, index } = props;

  useEffect(() => {
    if (operator !== '') {
      const arr = JSON.parse(localStorage.getItem('sellingProducts')) || [];
      
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

  const brlPrice = price.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
  // https://pt.stackoverflow.com/questions/181922/formatar-moeda-brasileira-em-javascript/186798

  return (
    <div className="products-card">
      <section className="products-global">
        <div className="card-img">
          <img className="image-photo" data-testid={`${index}-product-img`} src={img} alt="Cerveja" />
        </div>
        <div>
          <div className="products-content">
            <h4 data-testid={`${index}-product-name`}>{name}</h4>
          </div>
          <div className="price-count">
            <span data-testid={`${index}-product-price`}>{brlPrice}</span>
            <PlusMinus
              sellingQuantity={sellingQuantity}
              index={index} id={id}
              setSellingQuantity={setSellingQuantity}
              setOperator={setOperator}
              zeroQuantity={quantity.sellingQuantity || 0}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCard;
