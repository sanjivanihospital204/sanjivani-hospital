import { Button, InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useForm } from "react-hook-form";
import { CREATE_PATIENT, POST_API } from "../../Services/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MessageBarContext } from "../../App";

// style
const FormStyle = styled("form")(({ theme }) => ({
  // root style
  marginTop: theme.spacing(2),
  display: "grid",
  gap: theme.spacing(3),

  // input style
  "& label.Mui-focused": {
    color: theme.palette.success.main,
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: theme.palette.success.main,
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.success.main,
    },
  },

  // error
  "& .Mui-error.MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.error.light,
    },
  },
  "& label.Mui-error.Mui-focused": {
    color: theme.palette.error.light,
  },

  // Button style
  "& .MuiButton-contained": {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    fontWeight: 600,
    textTransform: "capitalize",
    padding: theme.spacing(1.25),
    boxShadow: `rgb(0 171 85 / 24%) 0px 8px 16px 0px`,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      boxShadow: "none",
    },
  },
}));

const RegisterPatientForm = () => {
  const { messageBar, setMessageBar } = useContext(MessageBarContext);

  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      address: "",
      contactNumber: "",
      weight: ""
    },
  });

  // submit
  const onSubmit = async (data) => {
    console.table(data);
    const createPatientResponse = await POST_API(CREATE_PATIENT, data);
    if (createPatientResponse?.status === "created") {
      setMessageBar({
        open: true,
        severity: "success",
        message: createPatientResponse.message,
      });
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: createPatientResponse.message,
      });
    }
    navigate("/patients");
  };

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Names box */}
      <Box display="flex" flexDirection="column" alignItems="flex-start">
        <label>Date Of Entry</label>
        <TextField
          variant="outlined"
          fullWidth
          type="date"
          {...register("date", { required: true })}
          error={errors.date ? true : false}
          helperText={errors.date && "Enter a valid date"}
          style={{ width: "100%" }}
        />
      </Box>
      <Box
        sx={{
          display: "grid",
          gap: { xs: 3, sm: 2 },
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Patient Name"
          {...register("name", { required: true })}
          error={errors.name ? true : false}
          helperText={errors.name && "Enter a valid Patient Name"}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Patient weight"
          {...register("weight", { required: true })}
          error={errors.weight ? true : false}
          helperText={errors.weight && "Enter a valid weight"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">kg</InputAdornment>
            ),
          }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Contact Number"
          {...register("contactNumber", { required: true })}
          error={errors.contactNumber ? true : false}
          helperText={errors.contactNumber && "Enter a valid Contact Number"}
        />
      </Box>

      <TextField
        variant="outlined"
        fullWidth
        multiline
        rows={3}
        type="text"
        label="Patient Address"
        {...register("address", { required: true })}
        error={errors.address ? true : false}
        helperText={errors.address && "Enter a valid address"}
      />

      {/* submit */}
      <Button type="submit" variant="contained" disableElevation>
        SUBMIT
      </Button>
    </FormStyle>
  );
};

export default RegisterPatientForm;
