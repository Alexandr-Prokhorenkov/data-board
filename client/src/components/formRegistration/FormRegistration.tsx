import React from "react";
import classes from "./FormRegistration.module.css";
import { Box, Button, FormGroup, TextField } from "@mui/material";
import { Controller } from "react-hook-form";
import { RegisterData } from "../../types/types";
import { Control, SubmitHandler } from "react-hook-form";

export type FormRegistrationProps = {
  control: Control<RegisterData>;
  handleSubmit: (callback: SubmitHandler<RegisterData>) => (event?: React.BaseSyntheticEvent) => Promise<void>;
  onSubmit: SubmitHandler<RegisterData>;
};

const FormRegistration: React.FC<FormRegistrationProps> = ({ handleSubmit, control, onSubmit }) => {
  return (
    <Box className={classes.form} component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
      <FormGroup>
        <Controller name="username" control={control} render={({ field }) => <TextField {...field} label="username" variant="filled" margin="normal" fullWidth required autoComplete="off" />} />
        <Controller
          name="password"
          control={control}
          render={({ field }) => <TextField {...field} label="Password" type="password" variant="filled" margin="normal" fullWidth required autoComplete="off" />}
        />
      </FormGroup>
      <Button className={classes.btn} type="submit" variant="contained" color="primary" fullWidth>
        Register
      </Button>
    </Box>
  );
};

export default FormRegistration;
