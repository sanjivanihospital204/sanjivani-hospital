import {
  Button,
  IconButton,
  InputAdornment
} from "@material-ui/core";
import { styled } from "@material-ui/styles";
import { TextField } from "@mui/material";
import CryptoJS from 'crypto-js';
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MessageBarContext } from "../../App";
import { ADMIN_LOGIN, ADMIN_LOGIN_API, LOCAL_OBJECT_SECRET_KEY, POST_API, VERIFY_TOKEN } from "../../Services/api";
import { getLocalStorageObject, setLocalStorageObject } from "../../Services/util";


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

  // checkbox style
  "& .MuiCheckbox-root": {
    color: theme.palette.success.light,
  },
  "& .Mui-checked": {
    color: theme.palette.success.main,
  },

  // forgot link style
  "& a": {
    color: theme.palette.success.main,
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.success.light,
    },
  },

  // button style
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

const FormLogin = () => {
  const [showPassword, setShowPassord] = useState(false);
  const handleTogglePassword = () => setShowPassord(!showPassword);
  const { messageBar, setMessageBar } = useContext(MessageBarContext);


  const navigate = useNavigate();

  useEffect(() => {
    const user = getLocalStorageObject('sanjivaniAuthToken');
    const loggedInUser =
      user && CryptoJS.AES.decrypt(user, LOCAL_OBJECT_SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const userData = JSON.parse(loggedInUser);

    async function verifyTokenIsValid(token) {
      const verifyTokenData = await POST_API(VERIFY_TOKEN, { token: token });
      if (verifyTokenData?.valid) {
        navigate('/');
      }
    }

    if (userData?.token) {
      verifyTokenIsValid(userData?.token);
    }
  }, [navigate]);

  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberUser: true,
    },
  });

  // prevent Default
  const preventDefault = (e) => e.preventDefault();

  // form submit
  const onSubmit = async (data) => {
    console.table(data);
    const { email, password } = data;
    const adminResponse = await ADMIN_LOGIN(ADMIN_LOGIN_API, {
      email,
      password,
    });

    if (adminResponse.validUser) {
      setMessageBar({
        open: true,
        severity: "success",
        message: adminResponse.message,
      });

      const userData = CryptoJS.AES.encrypt(
        JSON.stringify(adminResponse),
        LOCAL_OBJECT_SECRET_KEY
      ).toString();
      setLocalStorageObject('sanjivaniAuthToken', userData);
      navigate("/");
    } else {
      setMessageBar({
        open: true,
        severity: "error",
        message: adminResponse.message,
      });
    }
  };

  // for reset
  // couldn't make it work

  return (
    <FormStyle component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Email */}
      <TextField
        variant="outlined"
        fullWidth
        type="email"
        label="Email address"
        error={errors.email ? true : false}
        helperText={errors.email && "Enter a valid email address"}
        {...register("email", { required: true })}
      />

      {/* Password */}
      <TextField
        variant="outlined"
        fullWidth
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleTogglePassword}>
                {showPassword ? <RiEyeFill /> : <RiEyeOffFill />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        label="Password"
        error={errors.password ? true : false}
        helperText={
          errors.password && "Enter a valid password (5-15 characters)"
        }
        {...register("password", {
          required: true,
          minLength: 5,
          maxLength: 15,
        })}
      />

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              className="ckbox"
              checked={remember}
              onChange={handleToggleRemember}
            />
          }
          label="Remember me"
          {...register("rememberUser")}
        />

        <Link href="#" onClick={preventDefault} underline="always">
          Forgot password?
        </Link>
      </Box> */}

      <Button type="submit" variant="contained" disableElevation>
        Login
      </Button>
    </FormStyle>
  );
};

export default FormLogin;
