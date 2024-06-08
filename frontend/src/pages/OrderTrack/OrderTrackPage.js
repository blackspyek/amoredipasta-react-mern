import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { trackOrderById, updateStatusById } from "../../services/orderService";
import NotFound from "../../components/NotFound/NotFound";
import classes from "./orderTrackPage.module.css";
import DateTime from "../../components/DateTime/DateTime";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";
import { useAuth } from "../../hooks/useAuth";
import Title from "../../components/Title/Title";
import Map from "../../components/Map/Map";
export default function OrderTrackPage() {
  const { orderId } = useParams();
  const [order, setOrder] = useState();
  const { user } = useAuth();
  useEffect(() => {
    orderId &&
      (async () => {
        try {
          const order = await trackOrderById(orderId);
          setOrder(order);
        } catch (error) {}
      })();
  }, []);

  if (!order)
    return <NotFound message="Order Not Found" linkText="Go To Home Page" />;

  const updateState = async (orderId, status) => {
    updateStatusById(orderId, status);
  };
  return (
    order && (
      <div className={classes.container}>
        <div className={classes.content}>
          <h1>Order #{order.id}</h1>
          <div className={classes.header}>
            <div>
              <strong>Date</strong>
              <DateTime date={order.createdAt} />
            </div>
            <div>
              <strong>Name</strong>
              {order.name}
            </div>
            <div>
              <strong>Address</strong>
              {order.address}
            </div>
            <div>
              {user.isAdmin ? (
                <>
                  <strong>State</strong>
                  <select
                    defaultValue={order.status}
                    onChange={(e) => {
                      updateState(order.id, e.target.value);
                    }}
                  >
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="PREPARING">PREPARING</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="DELIVERY">DELIVERY</option>
                    <option value="PAYED">PAYED</option>
                  </select>
                </>
              ) : (
                <>
                  <strong>State</strong>
                  {order.status}
                </>
              )}
            </div>
            {order.paymentId && (
              <div>
                <strong>Payment ID</strong>
                {order.paymentId}
              </div>
            )}
          </div>
          <OrderItemsList order={order} />
        </div>
        <div>
          <Title title="Your Location" fontSize="1.6rem" />
          <Map location={order.addressLatLng} readonly={true} />
        </div>
        {order.status === "NEW" && (
          <div className={classes.payment}>
            <Link to={`/payment`}>Go To Payment</Link>
          </div>
        )}
      </div>
    )
  );
}
