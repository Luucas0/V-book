import React, { useEffect } from "react";

import AdminBooks from "./AdminBooks";
import AdminGenres from "./AdminGenres";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../state/user";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../commons/NotFoundPage";


const AdminPanel = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);



  return (
    user.role === "admin" ?
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      rounded={"lg"}
      bg={"white"}
      boxShadow={"lg"}
      p={8}
      spacing={4}
      maxWidth="fit-content"
      minW={"70%"}
      m={"auto"}
    >
      <Tabs isFitted variant="enclosed" minW={"100%"}>
        <TabList mb="1em">
          <Tab>Users</Tab>
          <Tab>Genres</Tab>
          <Tab>Books</Tab>
          <Tab>Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminUsers />
          </TabPanel>
          <TabPanel>
            <AdminGenres />
          </TabPanel>
          <TabPanel>
            <AdminBooks />
          </TabPanel>
          <TabPanel>
            <AdminOrders />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  : <NotFoundPage />)
};

export default AdminPanel;
