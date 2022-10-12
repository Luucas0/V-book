import React from "react";
import {
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Button,
  RadioGroup,
  Stack,
  Radio,
  useColorModeValue,
  Divider,
  Textarea,
  Heading,
  Text,
  Spacer,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Tooltip,
  Icon,
} from "@chakra-ui/react";

import { FaTrashAlt } from "react-icons/fa";

import { useForm, Controller } from "react-hook-form";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { modifyReview } from "../state/review";
import { getReviewsOfBook } from "../state/reviews";
import { deleteReview } from "../state/review";
import { getBook } from "../state/book";

import { useDispatch } from "react-redux";

const SingleReviewCard = ({ review }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const { id } = useParams();

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
    const payload = { ...values, bookId: id };
    await dispatch(modifyReview(payload));
    dispatch(getReviewsOfBook(id));
    dispatch(getBook(id))
    onClose();
  }

  async function handleDelete() {
    await dispatch(deleteReview(id));
    await dispatch(getReviewsOfBook(id));
    dispatch(getBook(id))
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
        <Text>{review.createdAt.split("T")[0]}</Text>
        <Text ml={"25px"} fontWeight={"bold"}>
          {user.id === review.userId ? "My comment" : review.userName}
        </Text>

        <Spacer />
        {user.id === review.userId && (
          <>
            <Button size="sm" colorScheme="pink" onClick={onOpen}>
              Edit comment
            </Button>
            <Tooltip
              label="Delete comment"
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
                  onClick={handleDelete}
                />
              </span>
            </Tooltip>
          </>
        )}
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
          isCentered
        >
          <ModalOverlay />
          <ModalContent p={"25px"}>
            <ModalHeader p={"0"} mb={"30px"}>
              Edit comment
            </ModalHeader>
            <ModalCloseButton />
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl id="valoration">
                <FormLabel fontWeight={"bold"}>Rating</FormLabel>
                <Controller
                  name="valoration"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction="row">
                        <Radio value="1">1</Radio>
                        <Radio value="2">2</Radio>
                        <Radio value="3">3</Radio>
                        <Radio value="4">4</Radio>
                        <Radio value="5">5</Radio>
                      </Stack>
                    </RadioGroup>
                  )}
                />
              </FormControl>

              <FormControl mt={4} isInvalid={errors.reviewComment}>
                <FormLabel htmlFor="reviewComment" fontWeight={"bold"}>
                  Your comment
                </FormLabel>
                <Textarea
                  ref={initialRef}
                  type="text"
                  id="reviewComment"
                  {...register("reviewComment", {
                    required: "This is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.reviewComment && errors.reviewComment.message}
                </FormErrorMessage>
              </FormControl>

              <Flex mt={7}>
                <Button
                  colorScheme="blue"
                  mr={3}
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </Flex>
            </form>
          </ModalContent>
        </Modal>
      </Flex>

      <Divider my={"15px"} />

      <Flex width={"100%"} my="10px" align={"start"} direction={"column"}>
        <Text fontWeight={"bold"}>Rating</Text>
        <Text>{`${review.valoration}`}</Text>
        <Text fontWeight={"bold"}>Comment</Text>
        <Text>{review.reviewComment}</Text>
        <Spacer />
      </Flex>
    </Flex>
  );
};

export default SingleReviewCard;
