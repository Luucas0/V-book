import React from "react";
import {
  Flex,
  Spacer,
  Heading,
  useColorModeValue,
  Text,
  Divider,
  Button,
  Image,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const OrderFullfiledCard = ({ order }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  function handleClick(productId) {
    navigate(`/book/${productId}`);
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
        <Spacer />
        <Button size="sm" colorScheme="pink" onClick={onOpen}>
          View details
        </Button>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Purchase details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex direction={'column'}>
                <Heading size={'sm'}>Adress</Heading>
                <Text>{order.direction}</Text>
                <Heading size={'sm'} mt={'25px'}>Payment method</Heading>
                <Text>{order.paymentMethod}</Text>
              </Flex>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>

      <Divider my={"15px"} />

      {order.carts.map((book) => (
        <Flex key={book.id} width={"100%"} my="10px" align={"center"}>
          <Image src={book.productImage} boxSize="30px" objectFit={"cover"} />
          <Text ml={"30px"}>{book.productTitle}</Text>
          <Spacer />
          <Button size="sm" onClick={() => handleClick(book.productId)}>
            Leave review
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

export default OrderFullfiledCard;
