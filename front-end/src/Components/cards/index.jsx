import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

const Cards = ({ index, numeroPedido, endereco, preco, status }) => {
  const history = useHistory();

  return (
    <div className="card-geral" onClick={() => history.push("/admin/details")}>
      <span data-testid={`${index}-order-number`} className="numero-pedido">
        Pedido: {numeroPedido}
      </span>
      <p data-testid={`${index}-order-address`} className="endereco">
        {endereco}
      </p>
      <div className="preco-status">
        <p data-testid={`${index}-order-total-value`}>{preco}</p>
        <label data-testid={`${index}-order-status`} className={status}>
          {status}
        </label>
      </div>
    </div>
  );
};

export default Cards;
