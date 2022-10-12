import React from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { postLoginUser } from "../state/user";

import jwt_decode from "jwt-decode";

import FacebookLogin from "react-facebook-login";

import { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  Divider,
  Box,
} from "@chakra-ui/react";

// const { resolve } = require("path");
// require("dotenv").config({ path: resolve(__dirname, "../../../.env") });

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //google login

  function handleCallbackResponse(response) {
    //console.log('encoded jwt', response.credential)
    let userObject = jwt_decode(response.credential);
    //console.log('token decoded', userObject)
    const payload = {
      name: userObject.given_name,
      lastname: userObject.family_name,
      email: userObject.email,
      userName: userObject.name,
      loginWithOauth: true,
    };
    dispatch(postLoginUser(payload));
    navigate("/");
  }

  const responseFacebook = (response) => {
    const payload = {
      name: response.name.split(" ")[0],
      lastname: response.name.split(" ")[1],
      email: response.email,
      userName: response.name,
      loginWithOauth: true,
    };
    dispatch(postLoginUser(payload));
    navigate("/");
  };

  const path = "/";

  useEffect(() => {
    /* global google */

    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("SignInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    dispatch(postLoginUser({ ...values, loginWithOauth: false })).then(
      (res) => {
        if (res.payload?.id) {
          navigate("/");
        } else {
          alert("password or mail incorrect. please try again!");
        }
      }
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction={"column"}
          align={"center"}
          justify={"center"}
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
          spacing={4}
          maxWidth="fit-content"
          m={"auto"}
        >
          <Stack align={"center"} mb="8">
            <Heading fontSize={"4xl"}>Sign in to your account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy our selection of books
            </Text>
          </Stack>
          <FormControl isInvalid={errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              {...register("email", {
                required: "This is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.password}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              type={"password"}
              id="password"
              {...register("password", {
                required: "This is required",
                minLength: {
                  value: 8,
                  message: "Minimum length should be 8",
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && errors.password.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={4}
            colorScheme="pink"
            isLoading={isSubmitting}
            type="submit"
          >
            Sign in
          </Button>

          <Divider my={'20px'} />

          <Box id="SignInDiv" mt={6}></Box>
          <Box id="SignInDivFacebook" mt={6} >
            <FacebookLogin
              appId="500567122070563"
              autoLoad={false}
              fields="name,email"
              callback={responseFacebook}
              icon="fa-facebook"
              buttonStyle={{
                backgroundColor: "white",
                color: "#3b5998",
                padding: "8px",
                textTransform: "capitalize",
                borderRadius: "4px",
                borderColor: "#e2e8f0",
                minWidth: '245px',
                //:hover {backgroundColor: "#e2e8f0"}
              }}
              
            />
          </Box>
          <Box id="SignInDivGitHub" mt={6}>
            <a
              href={`https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_REDIRECT_URL}?path=${path}&scope=user:email`}
            >
              <Button
                color={"black"}
                leftIcon={<FaGithub />}
                variant="outline"
                minWidth={'245px'}
              >
                Login with Github
              </Button>
            </a>
          </Box>

          <Divider orientation="horizontal" mt={9} />

          <Heading fontSize={"md"} mt={9}>
            New in our site ?{" "}
          </Heading>
          <Link to={"/register"}>
            <Button mt={6} colorScheme="blue">
              Register
            </Button>
          </Link>
        </Flex>
      </form>
    </>
  );
};

export default Login;
