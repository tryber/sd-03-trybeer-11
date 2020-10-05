import React from 'react';
import { useParams } from 'react-router-dom';
import { Details, TopMenu, ListDetails } from '../../../Components';
import takeSalesId from '../../../Services/apiSalesRequestId';

const AdminDetails = () => {

  const [info, setInfo] = React.useState(null);

  const { id } = useParams();

  async function chamarApi() {
    const data = await takeSalesId(id);
    return await setInfo(data);
  }

  React.useEffect(() => {
    chamarApi();
  },[id]);

  return (
    <>
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
    </>
  );
};

export default AdminDetails;
