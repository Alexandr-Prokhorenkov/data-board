import { AppBar, Container, IconButton, Typography } from "@mui/material";
import classes from "./AppBarUI.module.css";
import React from "react";
import FaceRetouchingOffIcon from "@mui/icons-material/FaceRetouchingOff";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store/store";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Иконка выхода
import { logoutUser } from "../../services/slices/userSlice";
import { useNavigate } from "react-router-dom";

const AppBarUI = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <AppBar position="static" className={classes.bar}>
      <Container maxWidth="xl" className={classes.container}>
        {user.isAuth ? <FaceRetouchingNaturalIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> : <FaceRetouchingOffIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />}
        <Typography>{user.isAuth ? user.user : "LOGIN"}</Typography>
        {user.isAuth && (
          <IconButton color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
            <ExitToAppIcon />
          </IconButton>
        )}
      </Container>
    </AppBar>
  );
};

export default AppBarUI;
