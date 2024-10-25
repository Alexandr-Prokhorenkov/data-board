import React from "react";
import classes from "./PreLoader.module.css";
import { Box, CircularProgress } from "@mui/material";

const PreLoader = () => {
  return (
    <Box className={classes.loaderContainer}>
      <CircularProgress size={40} color="inherit" />
    </Box>
  );
};

export default PreLoader;
