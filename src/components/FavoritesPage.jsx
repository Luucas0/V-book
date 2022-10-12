import React, { useEffect, useState } from "react";

import {
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  useToast,
  Button,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersFromUser } from "../state/orders";

import OrderFullfiledCard from "../commons/OrderFullfiledCard";
import {
  getAllFavoritesFromUser,
  searchFavoritesByTitle,
} from "../state/favorites";
import GridItems from "../commons/GridItems";
import { useNavigate } from "react-router-dom";
import NotFoundPage from "../commons/NotFoundPage";
import { Search2Icon } from "@chakra-ui/icons";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("Favorites");

  const user = useSelector((state) => state.user);
  const favorites = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getAllFavoritesFromUser());
  }, [dispatch]);

  const handleChange = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    dispatch(searchFavoritesByTitle(value));
    setTitle(`Search result for: ${value}`);
    setValue('')
  };

  function handleClick() {
    dispatch(getAllFavoritesFromUser());
    setTitle("Favorites");
  }

  return user.id ? (
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
      minW={"80%"}
      m={"auto"}
    >
      <Heading mb={"40px"}>{title}</Heading>
      <Container mb={"40px"}>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="grey.600"
              fontSize="1.2em"
              children={<Search2Icon color="green.500" />}
            />
            <Input
              placeholder="Search your favorite book"
              borderColor="black.600"
              value={value}
              onChange={handleChange}
            />
          </InputGroup>
        </form>
      </Container>
      {favorites.length ? (
        <Container maxW="4xl">
          <SimpleGrid minChildWidth="300px" spacing="40px">
            {favorites.map((book) => (
              <GridItems key={book.bookId} book={book} favorites={favorites} />
            ))}
          </SimpleGrid>
          {title !== "Favorites" && (
            <Button
              colorScheme={"pink"}
              p={"10px"}
              margin={"0 auto"}
              display={"block"}
              mt={"40px"}
              onClick={handleClick}
            >
              View all favorites
            </Button>
          )}
        </Container>
      ) : (
        "You don't have any favorite"
      )}
    </Flex>
  ) : (
    <NotFoundPage />
  );
};

export default FavoritesPage;
