import React from "react";
import GridComponent from "../commons/GridComponent";
import Hero from "./Hero";
import { Container, Divider, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "./Pagination";
import { useDispatch } from "react-redux";
import { getBooks } from "../state/books";

const Home = () => {
  const dispatch = useDispatch();

  const [gridTitle, setGridTitle] = useState("OUR BOOKS");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const books = useSelector((state) => state.books);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function handleClick() {
    dispatch(getBooks());
    setGridTitle("OUR BOOKS");
    window.scrollTo({
      top: 900,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Hero setGridTitle={setGridTitle} />
      <Heading
        w="100%"
        bgGradient="linear(to-r, green.200, pink.500)"
        mb={"100px"}
        textAlign="center"
        color="#f7f0f5"
        py={"40Px"}
      >
        {gridTitle}
      </Heading>
      <GridComponent books={currentPosts} id="gridView" />
      {gridTitle !== "OUR BOOKS" && (
        <Button
          onClick={handleClick}
          margin={"0 auto"}
          display={"block"}
          mt={"60px"}
          colorScheme={"pink"}
        >
          Show all books
        </Button>
      )}

      <Divider my={8} />
      <Pagination
        currentPage={currentPage}
        postsPerPage={postsPerPage}
        totalPosts={books.length}
        paginate={paginate}
      />
    </>
  );
};

export default Home;
