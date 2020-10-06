import React from "react";
import { Cards, Loading, TopMenu } from "../../../Components";
import useRequisition from "../../../Services/hook";
import takeSales from "../../../Services/apiSalesRequest";
import "./styles.css";

const AdminOrders = () => {
  const [{ loading, error, info }, { setLoading }] = useRequisition(takeSales);

  React.useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  // if (loading) return <Loading />;
  if (error) return <h3>{error}</h3>;

  return (
    <div>
      <TopMenu />
      {loading ? <Loading /> :
        <div className="admin-orders">
          {info &&
            info.map(({ id, number, total, address, status }, index) => (
              <Cards
                endereco={ address }
                addressNumber={ number }
                index={ index }
                key={ id }
                preco={ total }
                status={ status }
                index={ index }
                id={ id }
              />
            ))}
        </div>
      }
    </div>
  );
};

export default AdminOrders;
