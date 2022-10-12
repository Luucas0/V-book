import React from "react";
import { useState, useEffect } from "react";

//estilos de chakra ui
import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  useMediaQuery,
  GridItem,
  Text,
  LinkBox,
  LinkOverlay,
  useToast,
} from "@chakra-ui/react";

//iconos reactIcons
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";

//otros
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { starGenerator } from "../utils/starsGenerator";
import { addToCart } from "../state/cart";
import {
  addFavorite,
  getAllFavoritesFromUser,
  removeFavorite,
} from "../state/favorites";
import { isInFavorites } from "../utils/isInFavorites";

const GridItems = ({ book, favorites }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const user = useSelector((state) => state.user);

  //const [isNotSmallerScreen] = useMediaQuery("(min-width: 700px)");
  const handleAddToCart = async (e) => {
    let message;
    let typeOfMessage;
    e.preventDefault();
    await dispatch(addToCart(book.bookId || book.id)).then((res) => {
      if (typeof res.payload !== "string") {
        message = `Book added to your cart`;
        typeOfMessage = "success";
      } else {
        message = `The book is already in your cart`;
        typeOfMessage = "warning";
      }
    });

    toast({
      description: message,
      status: typeOfMessage,
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleAddToFavorites = async (e) => {
    e.preventDefault();
    await dispatch(addFavorite(book.bookId || book.id));
    toast({
      description: "Book added to your favorites",
      status: "success",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };
  const handleRemoveFromFavorites = async (e) => {
    e.preventDefault();
    await dispatch(removeFavorite(book.bookId || book.id));
    dispatch(getAllFavoritesFromUser());
    toast({
      description: "Book removed from your favorites",
      status: "warning",
      position: "top",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <GridItem>
      <Flex
        //w="full"
        alignItems="center"
        justifyContent="center"
        // h={isNotSmallerScreen ? "500px" : "auto"}
      >
        <Box
          bg={useColorModeValue("white", "gray.800")}
          maxW="sm"
          minW="100%"
          minH={"100%"}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          objectFit={"cover"}
          pt="24px"
        >
          <Link to={`/book/${book.bookId || book.id}`}>
            <Image
              src={book.posterURL || book.bookImage}
              alt={`Picture of ${book.title || book.bookTitle}`}
              roundedTop="lg"
              //width={"200px"}
              height={"160px"}
              overflow="hidden"
              margin="0 auto"
              //boxSize={'300px'}
              //objectFit='cover'
            />
          </Link>

          <Box p="6">
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                noOfLines={1}
              >
                {book.title || book.bookTitle}
              </Box>
            </Flex>
            {book.bookId ? "" : <Flex>{starGenerator(book.rating)}</Flex>}
            <Flex justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                color={useColorModeValue("gray.800", "white")}
                flexGrow="1"
              >
                <Box as="span" color={"gray.600"} fontSize="lg">
                  $
                </Box>
                {book.price.toFixed(2)}
              </Box>

              {user?.id ? (
                <>
                  {isInFavorites(favorites, book.bookId || book.id) ? (
                    <Tooltip
                      label="Remove from favorites"
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                      fontSize={"1.2em"}
                    >
                      <Text as={"span"} alignSelf="center">
                        <Icon
                          as={FaHeart}
                          h={5}
                          w={5}
                          alignSelf={"center"}
                          _hover={{ color: "#D83201" }}
                          onClick={handleRemoveFromFavorites}
                        />
                      </Text>
                    </Tooltip>
                  ) : (
                    <Tooltip
                      label="Add to favorites"
                      bg="white"
                      placement={"top"}
                      color={"gray.800"}
                      fontSize={"1.2em"}
                    >
                      <Text as={"span"} alignSelf="center">
                        <Icon
                          as={FaRegHeart}
                          h={5}
                          w={5}
                          alignSelf={"center"}
                          _hover={{ color: "#D83201" }}
                          onClick={handleAddToFavorites}
                        />
                      </Text>
                    </Tooltip>
                  )}

                  <Tooltip
                    label="Add to cart"
                    bg="white"
                    placement={"top"}
                    color={"gray.800"}
                    fontSize={"1.2em"}
                  >
                    <Text as={"span"} alignSelf="center">
                      <Icon
                        as={FiShoppingCart}
                        h={5}
                        w={5}
                        alignSelf={"center"}
                        ml="20px"
                        _hover={{ color: "#0166D8" }}
                        onClick={handleAddToCart}
                      />
                    </Text>
                  </Tooltip>
                </>
              ) : (
                <></>
              )}
            </Flex>
          </Box>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default GridItems;
