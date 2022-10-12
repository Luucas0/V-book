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
} from "@chakra-ui/react";

import { useForm } from "react-hook-form";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../state/book";
import { getBooks } from "../state/books";
import { editBook } from "../state/book";


const AdminBookItem = ({ book }) => {

  const dispatch = useDispatch();
  const genres = useSelector(state=> state.genres)


  async function handleDeleteClick(bookId) {
    await dispatch(deleteBook(bookId));
    dispatch(getBooks());
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
      await dispatch(editBook({...values, bookId: book.id }));
      dispatch(getBooks());
      onClose()
    }

  return (
    <Flex width={"100%"} my="10px">
      <Image src={book.posterURL} boxSize="30px" objectFit={"cover"} />
      <Text ml={"30px"}>{book.title}</Text>

      <Spacer />
      <Tooltip
        label="Edit book"
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
          <ModalHeader>Edit book</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  ref={initialRef}
                  defaultValue={book.title}
                  id="title"
                  {...register("title", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.description}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  ref={initialRef}
                  type="text"
                  defaultValue={book.description}
                  id="description"
                  {...register("description", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.description && errors.description.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.author}>
                <FormLabel htmlFor="author">Author</FormLabel>
                <Input
                  ref={initialRef}
                  defaultValue={book.author}
                  id="author"
                  {...register("author", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.author && errors.author.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4} isInvalid={errors.price}>
                <FormLabel htmlFor="price">Price</FormLabel>
                <Input
                  ref={initialRef}
                  type={"number"}
                  defaultValue={book.price}
                  id="price"
                  {...register("price", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.price && errors.price.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="posterURL">PosterURL</FormLabel>
                <Input
                  ref={initialRef}
                  type={"url"}
                  defaultValue={book.posterURL}
                  id="posterURL"
                  {...register("posterURL")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
                <Input
                  ref={initialRef}
                  type={'date'}
                  defaultValue={book.releaseDate.split('T')[0]}
                  id="releaseDate"
                  {...register("releaseDate")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="publisher">Publisher</FormLabel>
                <Input
                  ref={initialRef}
                  defaultValue={book.publisher}
                  id="publisher"
                  {...register("publisher")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="idGenre">idGenre</FormLabel>
                <Select ref={initialRef} id="idGenre" defaultValue={book.idGenre} {...register("idGenre")}>
                  {genres.length &&
                    genres.map((genre) => (
                      <option value={genre.id} key={genre.id}>
                        {genre.genreName}
                      </option>
                    ))}
                </Select>
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

      <Tooltip
        label="Delete book"
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
            onClick={() => handleDeleteClick(book.id)}
          />
        </span>
      </Tooltip>
    </Flex>
  );
};

export default AdminBookItem;
