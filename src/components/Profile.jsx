import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useMediaQuery
} from "@chakra-ui/react";
import { getAllFavoritesFromUser } from "../state/favorites";

const Profile = () => {
  const dispatch = useDispatch();
    const user = useSelector((state)=>state.user)
    const favorites = useSelector((state)=>state.favorites)

    const [isNotSmallerScreen] = useMediaQuery("(min-width : 700px)")
    const navigate = useNavigate()

    useEffect(()=>{
      dispatch(getAllFavoritesFromUser())
    }, [dispatch])

    const handleFavoritesButton = (e) =>{
      e.preventDefault()
      navigate("/favorites")
    }
    
    const handleBooksButton = (e) =>{
      e.preventDefault()
      navigate("/boughtItems")
    }
  return (
    <Center py={6}>
      <Box
        maxW={isNotSmallerScreen ? "600px" : "90%"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        
        <Image
          h={"120px"}
          w={"full"}
          src={
            "https://image.shutterstock.com/image-photo/back-school-concept-stack-books-260nw-1160400937.jpg"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"xl"}
            src={
              "https://s26162.pcdn.co/wp-content/uploads/2018/01/Headphones-Books-on-library-table-e1455308561248.jpg"
            }
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {user.userName||"John Doe"}
            </Heading>
            <Text color={"gray.500"}>{user.role || "Frontend Developer"}</Text>
          </Stack>

          <Stack direction={"row"} justify={"center"} spacing={6}>
            <Stack spacing={0} align={"center"}>
              <Text fontWeight={600}>{favorites ? favorites.length : "0"}</Text>
              <Text fontSize={"sm"} color={"gray.500"}>
                Favorites
              </Text>
            </Stack>
          </Stack>

          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={handleFavoritesButton}
          >
            Go to favorites
          </Button>
          <Button
            w={"full"}
            mt={8}
            bg={useColorModeValue("#151f21", "gray.900")}
            color={"white"}
            rounded={"md"}
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg",
            }}
            onClick={handleBooksButton}
          >
            My purchases
          </Button>
        </Box>
      </Box>
    </Center>
  );
};

export default Profile;
