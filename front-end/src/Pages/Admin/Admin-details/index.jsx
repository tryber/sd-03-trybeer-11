import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Details, TopMenu, ListDetails } from '../../../Components';
import takeSalesId from '../../../Services/apiSalesRequestId';

const AdminDetails = () => {

  const [info, setInfo] = useState(null);
  const { id } = useParams();
  console.log(info)

  async function chamarApi() {
    const data = await takeSalesId(id);
    return setInfo(data);
  }

  useEffect(() => {
    chamarApi();
  },[id]);

  return (
    <div>
      <TopMenu />
      {info && (
        <Details
          info={ info }
          id={ info.id }
          total={ info.totalPrice }
          numeroPedido={ info.id }
          status={ info.status }
          data={ info.date }
          setInfo={ setInfo }
        >
          <ListDetails info={info} />
        </Details>
      )}
    </div>
  );
};

export default AdminDetails;
