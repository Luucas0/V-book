import React, { useEffect } from "react";
import {
  Stack,
  Text,
  Button,
  useColorModeValue,
  Flex,
  Divider,
  Image,
  SimpleGrid,
  Link,
  Box,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../state/cart";
import { getOrder } from "../state/order";

const CartItem = ({ book }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const order = useSelector((state) => state.order);
  const [isNotSmallerScreen] = useMediaQuery("(min-width: 1300px)");

  const handleRemove = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(book.productId)).then(() =>
      dispatch(getOrder()).then(() =>
        toast({
          description: `Book removed from your cart`,
          status: "warning",
          position: "top",
          isClosable: true,
        })
      )
    );
  };

  return (
    <>
      <SimpleGrid
        templateColumns={
          isNotSmallerScreen ? "repeat(6, 1fr)" : "repeat(1, 1fr)"
        }
        columns={4}
        spacingX={"3rem"}
        rounded={"lg"}
        p={4}
      >
        {isNotSmallerScreen ? (
          <Box borderRadius="sm">
            <Image objectFit="cover" boxSize={"1sm"} src={book.productImage} />
          </Box>
        ) : (
          ""
        )}

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          align="center"
        >
          <Text>{book.productTitle}</Text>
        </Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          align={"center"}
        ></Stack>

        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          align={"center"}
        >
          <Text fontWeight="semibold"> AR${book.totalPrice}</Text>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          align={"center"}
        >
          <Link>
            <FaTrashAlt color="#BB421E" onClick={handleRemove} />
          </Link>
        </Stack>
      </SimpleGrid>
      <Divider />
    </>
  );
};

export default CartItem;
