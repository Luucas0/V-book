import React from "react";
import { Image, Text, Spacer, Icon, Tooltip, useToast } from "@chakra-ui/react";
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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { deleteGenre } from "../state/genre";
import { getGenres } from "../state/genres";
import { editGenre } from "../state/genre";

const AdminGenreItem = ({ genre }) => {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const toast = useToast();

  async function handleDeleteClick(genreId) {
    let message = "Genre deleted";
    let status = "success";
    await dispatch(deleteGenre(genreId)).then((res) => {
      if (res.payload.length) {
        message = `
        You can't remove this genre because it still has books `;
        status = "error";
      }
    });
    toast({
      description: message,
      status: status,
      position: "top",
      duration: 6000,
      isClosable: true,
    });
    dispatch(getGenres());
  }

  //modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  //form controll

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    await dispatch(editGenre({ ...values, genreId: genre.id }));
    dispatch(getGenres());
    onClose();
  }

  return (
    <Flex width={"100%"} my="10px">
      <Text ml={"30px"}>{genre.genreName}</Text>

      <Spacer />
      <Tooltip
        label="Edit genre"
        bg="white"
        placement={"top"}
        color={"gray.800"}
        fontSize={"1.2em"}
      >
        <span>
          <Icon as={FaEdit} _hover={{ color: "blue" }} onClick={onOpen} />
        </span>
      </Tooltip>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit genre</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.genreName}>
                <FormLabel htmlFor="title">Genre name</FormLabel>
                <Input
                  ref={initialRef}
                  defaultValue={genre.genreName}
                  id="genreName"
                  {...register("genreName", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.genreName && errors.genreName.message}
                </FormErrorMessage>
              </FormControl>

              <Flex mt={7} justify={"end"}>
                <Button
                  colorScheme="blue"
                  mr={3}
                  isLoading={isSubmitting}
                  type="submit"
                  onClick={onClose}
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Flex>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>

      <Tooltip
        label="Delete genre"
        bg="white"
        placement={"top"}
        color={"gray.800"}
        fontSize={"1.2em"}
      >
        <span>
          <Icon
            as={FaTrashAlt}
            ml="20px"
            _hover={{ color: "red" }}
            onClick={() => handleDeleteClick(genre.id)}
          />
        </span>
      </Tooltip>
    </Flex>
  );
};

export default AdminGenreItem;
