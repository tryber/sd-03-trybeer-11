import React from "react";
import { Link } from "react-router-dom";

import convertBRL from "../../../Services/BRLFunction";

import "./style.css";

const handleDate = (dateBase) => {
  const date = new Date(dateBase);
  console.log(date.getDay())
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
};

const SaleCard = ({ id, date, total, index }) => {
  return (
    <Link to={`/orders/${id}`} className="sale-card">
      <h3 className="sale-detail" data-testid={`${index}-order-number`}>
        Pedido {id}
      </h3>
      <p className="sale-detail sale-date" data-testid={`${index}-order-date`}>
        {handleDate(date)}
      </p>
      <p className="sale-detail" data-testid={`${index}-order-total-value`}>
        {convertBRL(total)}
      </p>
    </Link>
  );
};

export default SaleCard;
