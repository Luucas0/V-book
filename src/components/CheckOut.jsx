import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CheckOut = () => {
  return (
    <Container maxW="container.sm">
      <Box textAlign="center" py={10} px={6}>
        <CheckCircleIcon boxSize={"50px"} color={"green.500"} />
        <Heading as="h2" size="xl" mt={6} mb={2}>
          Thanks for your purchase
        </Heading>
        <Text color={"gray.500"}>
         Check out your email. We sent you the book and the payment receipt to your inbox.

        </Text>
        <Container p={"4"}>
        <Link to="/">
          <Button
            rounded={"md"}
            w={"40%"}
            m={4}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("#d43c8c", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
          >
            Keep shopping
          </Button>{" "}
          </Link>
          <Link to="/boughtItems">
          <Button
            rounded={"md"}
            w={"40%"}
            m={4}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("#d43c8c", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
          >
            Rate the book
          </Button>
          </Link>
        </Container>
      </Box>
    </Container>
  );
};

export default CheckOut;
