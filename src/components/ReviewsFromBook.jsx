import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsOfBook } from "../state/reviews";
import { useParams } from "react-router-dom";

import {
  Flex,
  useColorModeValue,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";
import SingleReviewCard from "../commons/SingleReviewCard";

const ReviewsFromBook = () => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getReviewsOfBook(id))
    .then(res=> console.log('ressss',res))
  }, [dispatch]);

  return (

    <Flex
      direction={"column"}
      align={"center"}
      justify={"center"}
      rounded={"lg"}
      bg={useColorModeValue("white", "gray.700")}
      p={8}
      spacing={4}
      maxWidth="fit-content"
      minW={"85%"}
      m={"auto"}
    >
      <Divider mb={'80px'} />
      <Heading mb={'40px'}>Reviews</Heading>
      {reviews?.length ? (reviews.map((review) => (
        <SingleReviewCard review={review} key={review.id}/>
      ))) : <Text>No reviews yet</Text>}
    </Flex>
  );
};

export default ReviewsFromBook;
