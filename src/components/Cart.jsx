import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Stack,
  Text,
  Button,
  Flex,
  SimpleGrid,
  Box,
  Heading,
  useMediaQuery,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  useToast,
  FormErrorMessage,
  Radio,
  RadioGroup,
  Container,
} from "@chakra-ui/react";
import CartItem from "../commons/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { continueOrder, getOrder, payOrder } from "../state/order";
import { cartTotal } from "../utils/cartTotal";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import NotFoundPage from "../commons/NotFoundPage";

import { deleteOrder } from "../state/order";

const Cart = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const [isNotSmallerScreen] = useMediaQuery("(min-width: 1200px)");
  const [paymentMethod, setPaymentMethod] = React.useState("Credit card");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleBuy = async () => {
    if (order.carts.length) {
      await dispatch(continueOrder());
      onOpen();
    } else {
      toast({
        title: `Please add something to your cart`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    }
  };
  const onSubmit = async ({ direction }) => {
    await dispatch(payOrder({ direction, paymentMethod }));
    navigate("/checkout");
  };

  useEffect(() => {
    dispatch(getOrder());
  }, [dispatch]);

  async function handleClick(){
    await dispatch(deleteOrder(order.id));
    dispatch(getOrder())
  }

  return user.id ? (
    <>
      <Container maxW="8xl">
        <SimpleGrid
          minChildWidth="300px"
          templateRows="repeat(2, 1fr)"
          justifyItems={"center"}
        >
          <Box
            rowSpan={1}
            colSpan={2}
            align={"center"}
            justify={"space-between"}
            rounded={"lg"}
            bg={"white"}
            boxShadow={"lg"}
            p={2}
            m={"auto"}
            height={"fit-content"}
          >
            {order.carts?.length
              ? order.carts?.map((book) => {
                  return <CartItem book={book} key={book.productId} />;
                })
              : "You have nothing in your cart yet."}
          </Box>
          <Flex
            maxWidth={"300px"}
            w={"100%"}
            mt={isNotSmallerScreen ? "8px" : "10px"}
            rounded={"md"}
            height={"fit-content"}
            boxShadow={"lg"}
            bg={"white"}
            justifyItems={"center"}
            align={"center"}
            direction={"column"}
          >
            <Heading m={5}>TOTAL</Heading>
            <Text>AR$ {order.carts ? cartTotal(order.carts) : 0} </Text>

            <Button
              onClick={handleBuy}
              rounded={"md"}
              w={"40%"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={"#d43c8c"}
              color={"white"}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "xl",
              }}
            >
              Buy{" "}
            </Button>
            <Button
              colorScheme={"red"}
              my={"40px"}
              p={"10px"}
              onClick={handleClick}
            >
              Remove all items
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Please complete these fields to continue
                </ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalBody pb={6}>
                    <FormControl isInvalid={errors.direction}>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="Your address"
                        {...register("direction", {
                          required: true,
                          minLength: {
                            value: 4,
                            message: "Invalid address, add another.",
                          },
                        })}
                      />
                      <FormErrorMessage>
                        {errors.direction && errors.direction.message}
                      </FormErrorMessage>
                    </FormControl>

                    <FormControl mt={10}>
                      <FormLabel fontWeight={"semibold"}>
                        Payment method
                      </FormLabel>
                      <RadioGroup
                        onChange={setPaymentMethod}
                        value={paymentMethod}
                      >
                        <Stack direction="row">
                          <Radio value="Credit card">Credit card</Radio>
                          <Radio value="Debit card">Debit card</Radio>
                          <Radio value="PayPal">PayPal</Radio>
                        </Stack>
                      </RadioGroup>
                    </FormControl>
                    <Flex mt={7} justify={"end"}>
                      <Button colorScheme="pink" mr={3} type="submit"
            isLoading={isSubmitting}
                      
                      >
                        Confirm purchase
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </Flex>
                  </ModalBody>
                </form>
              </ModalContent>
            </Modal>
          </Flex>
        </SimpleGrid>
      </Container>
    </>
  ) : (
    <NotFoundPage />
  );
};

export default Cart;
