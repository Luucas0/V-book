import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getAllOrders } from "../state/orders";

import AdminOrderItem from "../commons/AdminOrderItem";


import {

  Flex,
} from "@chakra-ui/react";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <Flex direction={"column"}>

      <Flex direction={"column"}>
        {orders.map((order) => (
          <AdminOrderItem order={order} key={order.id} />
        ))}
      </Flex>
    </Flex>
  );
};
export default AdminOrders;
