import React from "react";
import { useHistory } from "react-router-dom";
import convertBRL from '../../Services/BRLFunction';
import "./styles.css";

const Cards = ({ index, addressNumber, endereco, preco, status, id }) => {
  const history = useHistory();

  return (
    <div className="card-geral" onClick={() => history.push(`/admin/orders/${id}`)}>
      <span data-testid={`${index}-order-number`} className="numero-pedido">
        Pedido {id}
      </span>
      <p data-testid={`${index}-order-address`} className="endereco">
        {endereco}, {addressNumber}
      </p>
      <div className="preco-status">
        <p data-testid={`${index}-order-total-value`}>{convertBRL(preco)}</p>
        <label data-testid={`${index}-order-status`} className={status}>
          {status}
        </label>
      </div>
    </div>
  );
};

export default Cards;
