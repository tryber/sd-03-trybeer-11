import React, { useState, useEffect } from 'react';
import img1 from './images/img1.png';
import img2 from './images/img2.png';
import img3 from './images/img3.png';
import img4 from './images/img4.png';
import img5 from './images/img5.png';
import img6 from './images/img6.png';
import img7 from './images/img7.png';

const Loading = () => {
  const [drinks, setDrinks] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const drinksImgArr = [img1, img2, img3, img4, img5, img6, img7]
      const randomNumber = Math.floor(Math.random() * 6)
        setDrinks(drinksImgArr[randomNumber])
    }, 150)
    return () => clearInterval(interval);
  })

  return (
    <div>
      <img src={drinks} alt='bebidas' width="10%" />
    </div>
  );
}

export default Loading;
