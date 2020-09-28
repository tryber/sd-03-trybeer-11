import React, { useEffect } from "react";
import useRequisition from "./hook";

import { Loading } from "../../Components";
import SaleCard from "./InnerPage";
import takeSales from "../../Services/apiSalesRequest";

const MySales = () => {
  const [{ loading, error, info }, { setLoading }] = useRequisition(takeSales);

  useEffect(() => {
    setLoading(true);
  }, []);
  console.log(info, error, loading);

  if (loading) return <Loading />;
  if (error) return <h3>{error}</h3>;

  return (
    <div data-testid="0-order-card-container">
      {info &&
        info.map(({ id, date, value }, index) => (
          <SaleCard date={date} id={id} index={index} key={id} value={value} />
        ))}
    </div>
  );
};

export default MySales;
