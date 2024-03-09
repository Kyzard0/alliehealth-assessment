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
  toggleCreateUserModal: () => void;
  isCreateUserOpen: boolean;
  usersLoading: boolean;
  usersError: any;
  usersRefetch: () => void;
};

const initialValues: ContextData = {
  users: [],
  toggleCreateUserModal: () => { },
  isCreateUserOpen: false,
  usersLoading: false,
  usersError: null,
  usersRefetch: () => { }
}


const Context = createContext(initialValues);


export default function UsersContextProvider(props: React.PropsWithChildren) {
  const [users, setUsers] = useState<User[]>([]);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const [{ data, loading, error }, refetch] = useAxios(
    `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
  );

  useEffect(() => {
    setUsers(data?.users ?? [])
  }, [data]);

  const toggleCreateUserModal = () => {
    setIsCreateUserOpen(prevState => !prevState);
  }


  const contextValues = useMemo(() => ({
    users,
    toggleCreateUserModal,
    isCreateUserOpen,
    usersLoading: loading,
    usersError: error,
    usersRefetch: refetch
  }), [
    users,
    isCreateUserOpen,
    loading,
    error,
    refetch
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