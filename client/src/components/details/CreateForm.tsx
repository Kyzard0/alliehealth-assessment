import { Alert, Box, Button, TextField } from "@mui/material";
import useAxios from "axios-hooks";
import { Controller, FieldValues, useForm } from "react-hook-form";
import { useUsersContext } from "../../contexts/UsersContext";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

type Props = {
  onSubmit: () => void;
};

const CreateForm = ({ onSubmit }: Props) => {
  const { usersRefetch } = useUsersContext();
  const { register, handleSubmit, control } = useForm();
  const [{ loading, error }, executePost] = useAxios(
    {
      url: `${process.env.REACT_APP_SERVER_BASE_URL}/users`,
      method: "POST",
    },
    { manual: true },
  );

  const onFormSubmit = async (data: FieldValues) => {
    await executePost({ data });
    usersRefetch();
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        {error && (
          <Alert severity="error">
            Sorry - there was an error creating the user
          </Alert>
        )}
        <TextField
          label="First Name"
          variant="outlined"
          {...register("firstName")}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          {...register("lastName")}
        />
        <TextField label="Email" variant="outlined" {...register("email")} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            control={control}
            name="birthDate"
            render={({ field }) => {
              return (
                <DatePicker
                  label="Day of Birth"
                  value={field.value}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date);
                  }}
                />
              );
            }}
          />
        </LocalizationProvider>
        <Button variant="contained" type="submit" disabled={loading}>
          Create User
        </Button>
      </Box>
    </form>
  );
};

export default CreateForm;
