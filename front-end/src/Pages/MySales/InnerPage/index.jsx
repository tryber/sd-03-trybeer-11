import React from "react";
import { Link } from "react-router-dom";
import handleDate from '../../../Services/handleDate';
import convertBRL from "../../../Services/BRLFunction";
import "./style.css";

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
