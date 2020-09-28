import React, { useEffect } from "react";

import { Loading } from "../../Components";

import SaleCard from "./InnerPage";
import useRequisition from './hook/index';
import takeSales from "../../Services/apiSalesRequest";

import './style.css';

const MySales = () => {
  const [{ loading, error, info }, { setLoading }] = useRequisition(takeSales);

  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  if (loading) return <Loading />;
  if (error) return <h3>{error}</h3>;

  return (
    <div className="sales-cards-container" data-testid="0-order-card-container">
      {info &&
        info.map(({ id, date, value }, index) => (
          <SaleCard date={date} id={id} index={index} key={id} value={value} />
        ))}
    </div>
  );
};

export default MySales;
