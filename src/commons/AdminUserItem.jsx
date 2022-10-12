import React, { useState } from "react";
import { Image, Text, Spacer, Icon, Tooltip } from "@chakra-ui/react";
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
  Flex,
  Button,
  RadioGroup,
  Stack,
  Radio,
} from "@chakra-ui/react";

import { useForm, Controller } from "react-hook-form";
import { FaTrashAlt, FaEdit, FaUserEdit, FaUserAlt } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";

import { getUsers } from "../state/users";
import { promoteUser } from "../state/userAdminActions";
import { demoteUser } from "../state/userAdminActions";
import DeleteUser from "./DeleteUser";

const AdminUserItem = ({ user }) => {
  const dispatch = useDispatch();
  const [deleted,setDeleted] = useState(false)
  const [open, setOpen] = useState(false)
  const users = useSelector((state) => state.users);

  //estado para manejar el valor de radio input
  //const [value, setValue] = React.useState("1");


  function handleDeleteClick() {
  setDeleted(!deleted)
  }


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
    //console.log("values", values);
    if (values.role === "admin") {
      await dispatch(promoteUser(user.id));
    } else {
      await dispatch(demoteUser(user.id));
    }
    dispatch(getUsers());
    onClose();
  }

  return (
    <Flex width={"100%"} my="10px" align={'center'}>
      <Icon as={FaUserAlt}/>
      <Text ml={"30px"}>{`${user.name} ${user.lastname} (${user.role})`}</Text>

      <Spacer />
      <Tooltip
        label="Edit user"
        bg="white"
        placement={"top"}
        color={"gray.800"}
        fontSize={"1.2em"}
      >
        <span>
          <Icon as={FaUserEdit} _hover={{ color: "blue" }} onClick={onOpen} />
        </span>
      </Tooltip>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit(onSubmit)}>
            <ModalBody pb={6}>
              <FormControl id="role">
                <FormLabel>Set new role</FormLabel>
                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup {...field}>
                      <Stack direction="row">
                        {user.role === "admin" ? (
                          <Radio value="user">User</Radio>
                        ) : (
                          <Radio value="admin">Admin</Radio>
                        )}
                      </Stack>
                    </RadioGroup>
                  )}
                />
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

      <Tooltip
        label="Delete user"
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
            onClick={handleDeleteClick}

          />
        
        </span>
      </Tooltip>
      {deleted ? <DeleteUser user={user} setDeleted={setDeleted} /> : ""}
    </Flex>
  );
};

export default AdminUserItem;
