import { Button, InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MessageBarContext } from "../../App";
import { CREATE_PATIENT, POST_API, UPDATE_PATIENT } from "../../Services/api";
import { getDateFormate } from "../../Services/util";

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

const RegisterPatientForm = ({ data, editPatient, pId }) => {
  const { messageBar, setMessageBar } = useContext(MessageBarContext);


  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      address: "",
      contactNumber: "",
      weight: ""
    },
  });

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setValue("name", data.name);
      setValue("date", getDateFormate(data.date));
      setValue("address", data.address);
      setValue("contactNumber", data.contactNumber);
      setValue("weight", data.weight);
    }
  }, [data])


  // submit
  const onSubmit = async (data) => {

    const patientResponse = await POST_API(editPatient ? UPDATE_PATIENT : CREATE_PATIENT, editPatient ? {
      ...data,
      _id: pId,
    } : data);
    if (patientResponse?.status === "done") {
      setMessageBar({
        open: true,
        severity: "success",
        message: patientResponse.message,
      });
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: patientResponse.message,
      });
    }

    navigate("/patients");
  };

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        variant="outlined"
        fullWidth
        type="date"
        label="Date Of Entry"
        {...register("date", { required: true })}
        error={errors.date ? true : false}
        helperText={errors.date && "Enter a valid date"}
        style={{ width: "100%" }}
        InputLabelProps={{ shrink: true }}
      />
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
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Patient weight"
          {...register("weight", { required: true })}
          error={errors.weight ? true : false}
          helperText={errors.weight && "Enter a valid weight"}
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
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
        InputLabelProps={{ shrink: true }}
      />

      <Button type="submit" variant="contained" disableElevation>
        {editPatient ? "UPDATE" : "SUBMIT"}
      </Button>
    </FormStyle>
  );
};

export default RegisterPatientForm;
