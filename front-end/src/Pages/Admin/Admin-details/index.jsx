import React from 'react';
import { Details, TopMenu } from '../../../Components';

const AdminDetails = () => {

  return (
    <>
      <TopMenu />
      <Details numeroPedido={'0007'} status={'Entregue'} total={'20,00'} >
        <p>pedido tal</p> <p>tantos reais</p>
      </Details>
    </>
  )
};

export default AdminDetails;
