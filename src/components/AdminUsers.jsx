import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../state/users";

import AdminUserItem from "../commons/AdminUserItem";


import {
  Flex,
} from "@chakra-ui/react";

 const AdminUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

   useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]); 

  return (
    <Flex direction={"column"}>
      <Flex direction={"column"}>
        {users.map((user) => (
          <AdminUserItem user={user} key={user.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AdminUsers