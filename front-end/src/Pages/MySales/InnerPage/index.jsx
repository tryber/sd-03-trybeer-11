import React from 'react';
import { Link } from 'react-router-dom';

import convertBRL from '../../../Services/BRLFunction';

import './style.css';

const handleDate = (mili) => {
  const date = new Date(mili);
  return `${String(date.getDay()).padStart(2, '0')} / ${String(date.getMonth()).padStart(2, '0')}`;
};

const SaleCard = ({ id, number, date, total, index }) => {
  return (
    <Link to={`/orders/${id}`} className="sale-card">
      <h3 className="sale-detail" data-testid={`${index}-order-number`}>Pedido {number}</h3>
      <p className="sale-detail sale-date" data-testid={`${index}-order-date`}>{handleDate(date)}</p>
      <p className="sale-detail" data-testid={`${index}-order-total-value`}>{convertBRL(total)}</p>
    </Link>
  );
};

export default SaleCard;
