import React from "react";
import { Box } from "@mui/material";
import Home from "./home";
import UsersContextProvider from "../contexts/UsersContext";

const App = () => {
  return (
    <Box sx={{ maxWidth: 800, margin: "80px auto" }}>
      <UsersContextProvider>
        <Home />
      </UsersContextProvider>
    </Box>
  );
};

export default App;
