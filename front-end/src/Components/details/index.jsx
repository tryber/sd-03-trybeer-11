import React from 'react';
import convertBRL from '../../Services/BRLFunction';
import axios from 'axios';
import handleDate from '../../Services/handleDate';
import './styles.css';

const Details = ({ numeroPedido, status, total, children, id, data, setInfo, info }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const changeOrderStatus = () => {
    setInfo({ ...info, status: 'Entregue' });

    axios.put(`http://localhost:3001/sales/${id}`, {
      status: 'Entregue',
    },
    { headers: { Authorization: token }})
  }

  return (
    <div className="geral-details">
      <h1 className="numero-do-pedido" data-testid="order-number">Pedido {numeroPedido}</h1>
      { role === 'administrator' ?
      <h2 className={status} data-testid="order-status">{status}</h2>
      : <>
          <h2 className={status} data-testid="top-title">Detalhes do pedido</h2>
          <br/>
          <h2 className={status} data-testid="order-date">{handleDate(data)}</h2>
        </>
      }
      <div className="details-container">
        {children}
      </div>
        <h1 className="total" data-testid="order-total-value">Total: {convertBRL(total)}</h1>
      { role === 'administrator' && status !== 'Entregue' &&
        <button
          className="marcar-entregue"
          onClick={changeOrderStatus}
          data-testid="mark-as-delivered-btn">
            Marcar como entregue
        </button>}
    </div>
  );
}

export default Details;
