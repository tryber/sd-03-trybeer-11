import React, { useEffect } from "react";

import { Loading, TopMenu } from "../../Components";
import { useParams } from 'react-router-dom';
import SaleCard from "./InnerPage";
import useRequisition from '../../Services/hook/index';
import takeSales from "../../Services/apiSalesRequest";

import './style.css';

const MySales = () => {
  const [{ loading, error, info }, { setLoading }] = useRequisition(takeSales);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
  }, [setLoading]);

  if (loading) return <Loading />;
  if (error) return <h3>{error}</h3>;

  return (
    <>
      <TopMenu />
      <div className="sales-cards-container all" data-testid="0-order-card-container">
        {info &&
          info.map(({ id, date, total }, index) => (
            <SaleCard date={date} id={id} index={index} key={id} total={total} />
          ))}
      </div>
    </>
  );
};

export default MySales;
