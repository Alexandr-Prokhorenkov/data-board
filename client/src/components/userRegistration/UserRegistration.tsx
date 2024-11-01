import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import classes from "./UserRegistration.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../services/slices/userSlice";
import { getTable } from "../../services/slices/tableSlice";
import { AppDispatch } from "../../services/store/store";
import { useNavigate } from "react-router-dom";
import PreLoader from "../preLoader/PreLoader";
import FormRegistration from "../formRegistration/FormRegistration";
import { selectloadingUser } from "../../services/selectors/selectors";
import { RegisterData } from "../../services/slices/userSliceTypes";

const UserRegistration = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { control, handleSubmit, reset } = useForm<RegisterData>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const isLoading = useSelector(selectloadingUser);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: RegisterData) => {
    try {
      setLoading(true); // Устанавливаем состояние загрузки в true
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const registerResult = await dispatch(registerUser(data)).unwrap();
      if (registerResult && registerResult.data.token) {
        await dispatch(getTable({ token: registerResult.data.token })).unwrap();
        navigate("/table");
        reset();
      }
    } catch (error) {
      console.error("Ошибка при регистрации или получении данных таблицы:", error);
    } finally {
      setLoading(false); // Устанавливаем состояние загрузки в false после завершения
    }
  };

  return (
    <Box className={classes.registerContainer}>
      <Typography className={classes.title} variant="h2" component="h2">
        Registration
      </Typography>
      <FormRegistration handleSubmit={handleSubmit} control={control} onSubmit={onSubmit} />
      {(isLoading || loading) && <PreLoader />}
    </Box>
  );
};

export default UserRegistration;
