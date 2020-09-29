import React from 'react';
import { Cards } from '../../../Components';
import './styles.css';

const AdminOrders = () => {
// remover llinhas com mock quando for integrar o back
  return (
    <div className="admin-orders">
      <Cards numeroPedido={"0001"} endereco={"Rua de mock, 443"} preco={"R$ 14,56"} status={'Pendente'} index={1} />
    </div>
  )
};

export default AdminOrders;
