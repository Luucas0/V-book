import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getGenres } from "../state/genres";
import { addGenre } from "../state/genre";

import AdminGenreItem from "../commons/AdminGenreItem";

import { useForm } from "react-hook-form";

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

 const AdminGenres = () => {
  const dispatch = useDispatch();
  //const books = useSelector((state) => state.books);
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    //dispatch(getBooks());
    dispatch(getGenres());
  }, [dispatch]);

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
    console.log('valuesss', values)
    await dispatch(addGenre(values));
    dispatch(getGenres()); 
    onClose();
  }

  return (
    <Flex direction={"column"}>
      <Button mb={"40px"} onClick={onOpen}>
        Add new genre
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new genre</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>

              <FormControl isInvalid={errors.genreName}>
                <FormLabel htmlFor="genreName">Genre name</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Genre name"
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
                >
                  Save
                </Button>
                <Button onClick={onClose}>Cancel</Button>
              </Flex>
            </ModalBody>
          </form>
        </ModalContent>
      </Modal>

      <Flex direction={"column"}>
        {genres.map((genre) => (
          <AdminGenreItem genre={genre} key={genre.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AdminGenres