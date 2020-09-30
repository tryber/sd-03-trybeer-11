import React from 'react';
import './styles.css';

const Details = ({ numeroPedido, status, total, children }) => {

  return (
    <div className="geral-details">
      <h1 className="numero-do-pedido">Pedido: 0007</h1>
      <h2 className={status}>Entregue</h2>
      <div className="details-container">
        {children}
        <h1 className="total">Total: {total}</h1>
      </div>
      <button className="marcar-entregue">Marcar como entregue</button>
    </div>
  );
}

export default Details;
