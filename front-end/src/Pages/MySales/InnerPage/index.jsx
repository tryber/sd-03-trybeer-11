import React from 'react';

const SaleCard = ({ id, date, value, index }) => {
  return (
    <div>
      <p data-testid={`${index}-order-number`}>{id}</p>
      
      <p data-testid={`${index}-order-date`}>{date}</p>
      <p data-testid={`${index}-order-total-value`}>{value}</p>
    </div>
  );
};

export default SaleCard;
