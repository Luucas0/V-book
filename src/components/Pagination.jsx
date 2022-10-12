import { Button, Center, Container, Text } from "@chakra-ui/react";
import React from "react";

const Pagination = ({ currentPage, postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Center>
      <Container maxW="sm" justifyItems={"center"} align={"center"}>
        {pageNumbers.map((number) => (
          <Button
            key={number}
            onClick={() => paginate(number)}
            colorScheme="pink"
            rounded="md"
            variant={number !== currentPage ? "none" : "ghost"}
            aria-label="pageButton"
          >
            {number}
          </Button>
        ))}
      </Container>
    </Center>
  );
};

export default Pagination;
