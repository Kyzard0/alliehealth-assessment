import useAxios from "axios-hooks";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


export type User = {
  id: number;
  first_name: string;
  last_name: string;
  date_of_birth: Date;
  email: string;
}

type ContextData = {
  users: User[],
  selectedUser: User | undefined;
  setSelectedUser: (user: User) => void;
  toggleCreateUserModal: () => void;
  isCreateUserOpen: boolean;
  usersLoading: boolean;
  usersError: any;
  usersRefetch: () => void;
  isDetailsUserOpen: boolean;
  toggleDetailsUserModal: () => void;
};

const initialValues: ContextData = {
  users: [],
  selectedUser: undefined,
  setSelectedUser: (user: User) => { },
  toggleCreateUserModal: () => { },
  isCreateUserOpen: false,
  usersLoading: false,
  usersError: null,
  usersRefetch: () => { },
  isDetailsUserOpen: false,
  toggleDetailsUserModal: () => { },
}


const Context = createContext(initialValues);


export default function UsersContextProvider(props: React.PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isDetailsUserOpen, setIsDetailsUserOpen] = useState(false);


  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
  );

  useEffect(() => {
    setUsers(data?.users ?? [])
  }, [data]);

  const toggleCreateUserModal = () => {
    setIsCreateUserOpen(prevState => !prevState);
  }

  const toggleDetailsUserModal = () => {
    setIsDetailsUserOpen(prevState => !prevState);
  }


  const contextValues = useMemo(() => ({
    users,
    toggleCreateUserModal,
    isCreateUserOpen,
    usersLoading: loading,
    usersError: error,
    usersRefetch: refetch,
    isDetailsUserOpen,
    toggleDetailsUserModal,
    selectedUser,
    setSelectedUser
  }), [
    users,
    isCreateUserOpen,
    loading,
    error,
    refetch,
    isDetailsUserOpen,
    selectedUser
  ]);

  return (
    <Context.Provider value={contextValues}>
      {props.children}
    </Context.Provider>
  );
}

function useUsersContext() {
  return useContext(Context)
}

export { useUsersContext }