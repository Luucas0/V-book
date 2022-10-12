import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { getBooks } from "../state/books";
import { postBook } from "../state/book";
import { getGenres } from "../state/genres";

import AdminBookItem from "../commons/AdminBookItem";

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

const AdminBooks = () => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books);
  const genres = useSelector(state=> state.genres)

  useEffect(() => {
    dispatch(getBooks());
    dispatch(getGenres())
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
    await dispatch(postBook(values));
    dispatch(getBooks());
    onClose()
  }

  return (
    <Flex direction={"column"}>
      <Button mb={"40px"} onClick={onOpen}>
        Add new book
      </Button>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new book</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl isInvalid={errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Title"
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
                  placeholder="Description"
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
                  placeholder="Author"
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
                  placeholder="Price"
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
                  placeholder="PosterURL"
                  id="posterURL"
                  {...register("posterURL")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="releaseDate">Release Date</FormLabel>
                <Input
                  ref={initialRef}
                  type={"date"}
                  placeholder="Release Date"
                  id="releaseDate"
                  {...register("releaseDate")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="publisher">Publisher</FormLabel>
                <Input
                  ref={initialRef}
                  placeholder="Publisher"
                  id="publisher"
                  {...register("publisher")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="rating">rating</FormLabel>
                <Input
                  ref={initialRef}
                  type={"number"}
                  placeholder="rating"
                  id="rating"
                  {...register("rating")}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel htmlFor="idGenre">idGenre</FormLabel>
                <Select
                  ref={initialRef}
                  id="idGenre"
                  {...register("idGenre")}
                >
                  {genres.length && genres.map(genre=>(
                    <option value={genre.id} key={genre.id}>{genre.genreName}</option>
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

      <Flex direction={"column"}>
        {books.map((book) => (
          <AdminBookItem book={book} key={book.id} />
        ))}
      </Flex>
    </Flex>
  );
};

export default AdminBooks;
