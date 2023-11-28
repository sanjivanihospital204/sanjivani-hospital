import { Button, InputAdornment } from "@material-ui/core";
import { styled } from "@material-ui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
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

  const [selectedBillCharge, setSelectedBillCharge] = useState('');

  const handleChange = (event) => {
    setSelectedBillCharge(event.target.value);
  };

  const navigate = useNavigate();

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    reset
  } = useForm({
    defaultValues: {
      name: "",
      date: "",
      address: "",
      contactNumber: "",
      weight: "",
      gender: "",
      age: "",
      referDoctor: "",
      consultantDoctor: "",
    },
  });

  const { fields, remove, append } = useFieldArray({
    control,
    name: "billCharges"
  });

  const billChargesList = [
    'Doctor visit charge - 1000',
    'Medical officer visit charge - 500',
    'Nursing staff charge - 300',
    'Oxygen charge - 1000',
    'Biomedical waste charges - 200',
    'Dressing charge(small) - 100',
    'Dressing charge (big) - 300',
    'Day care admission charges - 500',
    'Emergency room charge - 2000',
    'Admission charge - 250',
    'Multipara monitor charge - 500',
    'Infusion pump charge - 500',
  ];  

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      reset({
        billCharges: data.billCharges,
        name: data.name,
        date: getDateFormate(data.date),
        address: data.address,
        contactNumber: data.contactNumber,
        weight: data.weight,
        age: data.age,
        gender: data.gender,
        referDoctor: data.referDoctor,
        consultantDoctor: data.consultantDoctor
      });
    }
  }, [data]);

  // submit
  const onSubmit = async (data) => {
    const patientResponse = await POST_API(
      editPatient ? UPDATE_PATIENT : CREATE_PATIENT,
      editPatient
        ? {
          ...data,
          _id: pId,
        }
        : data
    );
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
          {...register("weight", {
            required: true,
            pattern: {
              value: /^\d{0,3}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.weight ? true : false}
          helperText={errors.weight && "Enter a valid weight"}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Patient Age"
          {...register("age", {
            required: true,
            pattern: {
              value: /^\d{0,3}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.age ? true : false}
          helperText={errors.age && "Enter a valid Patient Age"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="number"
          label="Contact Number"
          {...register("contactNumber", {
            required: true,
            pattern: {
              value: /^\d{10}$/,
              message: "Enter a valid weight with exactly 3 digits",
            },
          })}
          error={errors.contactNumber ? true : false}
          helperText={errors.contactNumber && "Enter a valid Contact Number"}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Gender</FormLabel>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <RadioGroup {...field} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </RadioGroup>
          )}
        />
        {errors.gender && <span>Choose a gender</span>}
      </FormControl>

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
          label="Refer Doctor"
          {...register("referDoctor", { required: true })}
          error={errors.referDoctor ? true : false}
          helperText={errors.referDoctor && "Refer Doctor"}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          variant="outlined"
          fullWidth
          type="text"
          label="Consultant Doctor"
          {...register("consultantDoctor", { required: true })}
          error={errors.consultantDoctor ? true : false}
          helperText={errors.consultantDoctor && "Consultant Doctor"}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      {fields.map(({ id, chargeList, days }, index) => (
        <div key={id}>
          <Box
            sx={{
              display: "grid",
              gap: { xs: 3, sm: 2 },
              gridTemplateColumns: { xs: "1fr", sm: "5fr 3fr 1fr" },
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">List</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="billCharges-${index}"
                // value={selectedBillCharge}
                label="Age"
                onChange={handleChange}
                defaultValue={chargeList}
                {...register(`billCharges[${index}].chargeList`)}
              >
                {billChargesList.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              fullWidth
              type="number"
              label="Days"
              {...register(`billCharges[${index}].days`)}
              InputLabelProps={{ shrink: true }}
              defaultValue={days}
            />
            <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => remove(index)} color="error">
              Delete
            </Button>
          </Box>
        </div>
      ))}

      <Button variant="outlined" endIcon={<ReceiptLongIcon />} onClick={() => append({})}>
        Add Bill Charges
      </Button>

      <Button type="submit" variant="contained" disableElevation>
        {editPatient ? "UPDATE" : "SUBMIT"}
      </Button>
    </FormStyle>
  );
};

export default RegisterPatientForm;
