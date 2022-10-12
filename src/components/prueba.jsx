import React from "react";

import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { postLoginUser } from "../state/user";

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
} from "@chakra-ui/react";

import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//google login

   function handleCallbackResponse (response){
    console.log('encoded jwt', response.credential)
  }

  useEffect(()=>{ 
    /* global google */
     google.accounts.id.initialize({
      client_id: "562725990282-c2kv3hgfmtb2jcs9uknpq9gkarc07d5j.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });

    google.accounts.id.renderbutton(
      document.getElementById('SignInDiv'),
      {theme: 'outline', size: 'large'}
    )

  }, []);

   

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    dispatch(postLoginUser(values)).then((res) => {
      if (res.payload?.id) {
        navigate("/");
      } else {
        alert("password or mail incorrect. please try again!");
      }
    });
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
            Sing in
          </Button>
{/*           <Button
            mt={4}
            color={"black"}
            leftIcon={<FcGoogle />}
            variant="outline"
          >
            Login with Google
          </Button> */}
          <div id="SignInDiv" >
            
          </div>

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
