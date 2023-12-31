import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useRef } from "react";
import userService, { User } from "../../services/User/user-service";
import UserContext from "../../Contexts/User/UserContext";

interface Props {
  selectedDeleteUser: User;
}

const UserDeleteDrawer = ({ selectedDeleteUser }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const deleteToast = useToast();

  const { users, setUsers } = useContext(UserContext);
  const user_can_not_delete_message = <Text textColor='red.700'>You can't delete this user.</Text>;

  const onDeleteUser = (user: User) => {
    const originalUsers = [...users];

    setUsers(users.filter((u) => u.id !== user.id));

    userService
      .delete(`${user.id}`)
      .then((res) => {
        if (res.status === 204) {
          deleteToast({
            title: "User",
            description: "User successfully deleted.",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        setUsers(originalUsers);

        deleteToast({
          title: "Error",
          description: "User not successfully deleted.",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Button bg="#f87454" onClick={onOpen}>
        Delete
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete User {selectedDeleteUser.user_name}
            </AlertDialogHeader>

            <AlertDialogBody>
              {selectedDeleteUser.is_superuser
                ? user_can_not_delete_message
                : "Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              {!selectedDeleteUser.is_superuser && <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  onDeleteUser(selectedDeleteUser);
                }}
                ml={3}
              >
                Delete
              </Button>}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default UserDeleteDrawer;
