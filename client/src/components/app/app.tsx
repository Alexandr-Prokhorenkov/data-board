import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Box } from "@mui/material";
import UserRegistration from "../userRegistration/UserRegistration";
import UserTable from "../userTable/UserTable";
import AppBarUI from "../appBarUI/AppBarUI";

export const App = () => {
  return (
    <Box className="App">
      <AppBarUI />
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/table" element={<UserTable />} />
      </Routes>
    </Box>
  );
};
