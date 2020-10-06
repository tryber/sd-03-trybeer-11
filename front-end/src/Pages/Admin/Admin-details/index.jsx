import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Details, TopMenu, ListDetails } from '../../../Components';
import takeSalesId from '../../../Services/apiSalesRequestId';

const AdminDetails = () => {

  const [info, setInfo] = useState(null);

  const { id } = useParams();

  async function chamarApi() {
    const data = await takeSalesId(id);
    return await setInfo(data);
  }

  useEffect(() => {
    chamarApi();
  },[id]);

  return (
    <div>
      <TopMenu />
      {info && (
        <Details
          id={info.id}
          total={ info.totalPrice }
          numeroPedido={ info.id }
          status={ info.status }
          data={ info.date }
        >
          <ListDetails info={info} />
        </Details>
      )}
    </div>
  );
};

export default AdminDetails;
