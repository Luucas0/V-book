import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Button,
  RadioGroup,
  Stack,
  Radio,
  Divider,
  Textarea,
  Heading,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";

import { addReview } from "../state/review";
import { getReviewsOfBook } from "../state/reviews";
import { getBoughtItems } from "../state/boughtItems";
import { getBook } from "../state/book";

import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";

const LeaveReview = () => {
  const [resize] = React.useState("horizontal");
  const dispatch = useDispatch();
  const { id } = useParams();
  const user = useSelector((state) => state.user);
  const reviews = useSelector((state) => state.reviews);
  const book = useSelector((state) => state.book);
  const boughtItems = useSelector((state) => state.boughtItems);

  const [alreadyLeftComment, setAlreadyLeftComment] = useState(false);
  const [alreadyBought, setAlreadyBought] = useState(false);

  useEffect(() => {
    dispatch(getBoughtItems());
    const findIdUser = reviews.find((review) => review.userId === user.id);
    const findBoughtItems = boughtItems.find((item) => item.productId === parseInt(id));

    if (findIdUser) {
      setAlreadyLeftComment(true);
    } else {
      setAlreadyLeftComment(false);
    }
    if(findBoughtItems){
      setAlreadyBought(true)
    }else{
      setAlreadyBought(false)
    }
  }, [reviews, user, book, dispatch]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  async function onSubmit(values) {
    const payload = { ...values, bookId: id };
    await dispatch(addReview(payload));
    dispatch(getReviewsOfBook(id));
    dispatch(getBook(id))
  }

  const initialRef = React.useRef(null);

  return (
    user.id && (
<>
      {!alreadyLeftComment && alreadyBought && (
        <Flex
          direction={"column"}
          align={"start"}
          justify={"center"}
          rounded={"lg"}
          bg={'white'}
          boxShadow={"lg"}
          p={8}
          spacing={4}
          maxWidth="fit-content"
          minW={"85%"}
          m={"auto"}
          mt={"30px"}
        >
          <Heading size={"md"} alignSelf={'center'}>Leave a review</Heading>
          <Divider my={"15px"} />
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="valoration">
              <FormLabel fontWeight={"bold"}>Rating</FormLabel>
              <Controller
                name="valoration"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field} colorScheme={'pink'}>
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
              resize={resize}
              size={'lg'}
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
                colorScheme="pink"
                mr={3}
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Flex>
          </form>
        </Flex>
      )}
    </>
    )
    
  );
};

export default LeaveReview;
