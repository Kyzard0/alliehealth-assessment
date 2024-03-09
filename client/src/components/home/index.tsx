import { Box, Button, CircularProgress } from "@mui/material";
import UsersTable from "./UsersTable";
import MessageContainer from "./MessageContainer";
import CreateUserModal from "../create";
import UploadInput from "./UploadInput";
import { useUsersContext } from "../../contexts/UsersContext";
import DetailsUserModal from "../details";

const Home = () => {
  const {
    isCreateUserOpen,
    isDetailsUserOpen,
    users,
    usersRefetch,
    usersLoading,
    usersError,
    toggleCreateUserModal,
    toggleDetailsUserModal
  } = useUsersContext();

  if (usersLoading) {
    return (
      <MessageContainer>
        <CircularProgress />
      </MessageContainer>
    );
  }

  if (usersError) {
    return (
      <MessageContainer>
        <Box>Error loading users</Box>
        <Button variant="contained" onClick={() => usersRefetch()}>
          Retry
        </Button>
      </MessageContainer>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "right",
          gap: 1,
          marginBottom: 3,
        }}
      >
        <UploadInput />
        <Button variant="contained" onClick={toggleCreateUserModal}>
          Create User
        </Button>
      </Box>
      <UsersTable users={users} />
      <CreateUserModal
        open={isCreateUserOpen}
        handleClose={toggleCreateUserModal}
      />
      <DetailsUserModal
        open={isDetailsUserOpen}
        handleClose={toggleDetailsUserModal}
      />
    </>
  );
};

export default Home;
