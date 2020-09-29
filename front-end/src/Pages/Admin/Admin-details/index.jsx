import React from 'react';
import { Details } from '../../../Components';

const AdminDetails = () => {

  return (
    <Details numeroPedido={'0007'} status={'Entregue'} total={'20,00'} >
      <p>pedido tal</p> <p>tantos reais</p>
    </Details>
  )
};

export default AdminDetails;
