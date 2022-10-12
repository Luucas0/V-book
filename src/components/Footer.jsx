import { Stack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaInstagramSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

import {
  Box,
  chakra,
  Container,
  Link,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";

const Footer = () => {

  function handleClick(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <Stack
      direction={"row"}
      align="center"
      justify={"space-between"}
      //bgColor="#DECBB7"
      mt={"auto"}
    >
      <Image
        boxSize="100px"
        objectFit="cover"
        src="https://media-exp1.licdn.com/dms/image/C560BAQGp306CSTk2yg/company-logo_200_200/0/1586255689376?e=2147483647&v=beta&t=uqldPM3J_8r8Vkg5xdZ0vsou-o3MCjNmgZjzC9nEpk4"
        alt="Dan Abramov"
        onClick={handleClick}
      />

      <Text fontSize="sm">© 2022 VBook company. All rights reserved</Text>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
        //bgColor="#DECBB7"
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Stack direction={"row"} spacing={6}>
            <chakra.button
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
              rounded={"full"}
              w={8}
              h={8}
              cursor={"pointer"}
              as={"a"}
              //href={href}
              display={"inline-flex"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"background 0.3s ease"}
              _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              }}
            >
              <FaTwitter />
            </chakra.button>
            <chakra.button
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
              rounded={"full"}
              w={8}
              h={8}
              cursor={"pointer"}
              as={"a"}
              //href={href}
              display={"inline-flex"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"background 0.3s ease"}
              _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              }}
            >
              <FaYoutube />
            </chakra.button>
            <chakra.button
              bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
              rounded={"full"}
              w={8}
              h={8}
              cursor={"pointer"}
              as={"a"}
              //href={href}
              display={"inline-flex"}
              alignItems={"center"}
              justifyContent={"center"}
              transition={"background 0.3s ease"}
              _hover={{
                bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
              }}
            >
              <FaInstagram />
            </chakra.button>
          </Stack>
        </Container>
      </Box>
    </Stack>
  );
};

export default Footer;
