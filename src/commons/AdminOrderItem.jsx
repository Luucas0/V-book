import React from "react";
import { Image, Text, Spacer, Icon, Tooltip } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Button,
  Select,
  RadioGroup,
  Stack,
  Radio,
  Checkbox,
  CheckboxGroup,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";

import { modifyOrder } from "../state/order";
import { getAllOrders } from "../state/orders";

import { useForm, Controller } from "react-hook-form";

import { useDispatch } from "react-redux";

const AdminOrderItem = ({ order }) => {
  const dispatch = useDispatch();

  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  //form controll

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const payload = { ...values, orderId: order.id };
    console.log("values", payload);
    await dispatch(modifyOrder(payload));
    dispatch(getAllOrders());
    onClose();
  }

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      boxShadow={"lg"}
      p={8}
      spacing={4}
      maxWidth="80%"
      minW={"80%"}
      m={"auto"}
      mb={"20px"}
    >
      <Flex align={"center"} w={"100%"}>
        <Text>{order.createdAt.split("T")[0]}</Text>
        <Text ml={"20px"}>{order.user?.email}</Text>
        <Text ml={"20px"}>{order.state}</Text>

        <Spacer />
        <Button size="sm" colorScheme="pink" onClick={onOpen}>
          Edit order state
        </Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit order state</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody pb={6}>
                <FormControl id="state">
                  <FormLabel>Set new state</FormLabel>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <RadioGroup {...field}>
                        <Stack direction="row">
                          <Radio value="fulfilled">fulfilled</Radio>
                          <Radio value="procesing">procesing</Radio>
                          <Radio value="pending">pending</Radio>
                          <Radio value="rejected">rejected</Radio>
                        </Stack>
                      </RadioGroup>
                    )}
                  />
                </FormControl>

                <Flex mt={7} justify={"end"}>
                  <Button
                    colorScheme="blue"
                    mr={3}
                    isLoading={isSubmitting}
                    type="submit"
                  >
                    Save
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                </Flex>
              </ModalBody>
            </form>
          </ModalContent>
        </Modal>
      </Flex>

      <Divider my={"15px"} />

      {order.carts.map((book) => (
        <Flex key={book.id} width={"100%"} my="10px" align={"center"}>
          <Image src={book.productImage} boxSize="30px" objectFit={"cover"} />
          <Text ml={"30px"}>{book.productTitle}</Text>
          <Spacer />
        </Flex>
      ))}
    </Flex>
  );
};

export default AdminOrderItem;
