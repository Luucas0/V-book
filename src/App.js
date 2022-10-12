import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Register from "./components/Register";
import ProductPage from "./commons/ProductPage";
import Home from "./components/Home";
import AdminPanel from "./components/AdminPanel";
import Profile from "./components/Profile";
import BoughtItems from "./components/BoughtItems";

import { Flex, Box, useMediaQuery } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getUser } from "./state/user";
import CategoriesPage from "./commons/CategoriesPage";
import Cart from "./components/Cart";
import CheckOut from "./components/CheckOut";
import FavoritesPage from "./components/FavoritesPage";
import { getAllFavoritesFromUser } from "./state/favorites";
import NotFoundPage from "./commons/NotFoundPage";

function App() {
  const dispatch = useDispatch();

  //se ejecuta una sola vez cuando carga la pagina y ahce un pedido a /me para ver si hay un token
  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllFavoritesFromUser())
  }, [dispatch]);

  const [isNotSmallerScreen] = useMediaQuery("(min-width: 700px)");

  return (
    <Flex direction={"column"} minHeight="100vh">
      <Navbar />
      <Box p={isNotSmallerScreen ? "9" : '0'} flexGrow="1" bg={"#F7F0F5"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/favorites" element={<FavoritesPage/>} />
          <Route path="/category/:genreId" element={<CategoriesPage />} />
          <Route path="/book/:id" element={<ProductPage />} />
          <Route path='/admin' element={<AdminPanel />} />
          <Route path='/me' element={<Profile/>} />
          <Route path='/boughtItems' element={<BoughtItems/>} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />

        </Routes>
      </Box>

      <Footer />
    </Flex>
  );
}

export default App;
