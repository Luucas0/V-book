import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button,
  } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUser } from '../state/userAdminActions';
import { getUsers } from '../state/users';


const DeleteUser = ({user, setDeleted}) => {
  const dispatch = useDispatch();

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    

useEffect(()=>{
onOpen()
}, [])

  //delete user action
 async function handleDeleteUser(userId) {
    await dispatch(deleteUser(userId));
    dispatch(getUsers());
      onClose()
      setDeleted(true)
  } 

const handleCancel = () =>{
    setDeleted(false)
    onClose()

}

  return (
    <>
    
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete User
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={()=>{handleCancel()}}>
                Cancel
              </Button>
              <Button colorScheme='pink' onClick={()=>handleDeleteUser(user.id)} ml={3}>
                Delete 
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteUser