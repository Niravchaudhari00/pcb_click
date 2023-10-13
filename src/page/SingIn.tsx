import {
  Alert,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import "../App.css";
import { BgColor } from "../utils/constant/Colour";
import { Link, useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import NotifyError from "../components/common/NotifyError";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import axiosInstance from "../services/AxiosInstance";
import { Auth } from "../services/API";
import { setProgress, setToken } from "../redux/slice/AuthSlice";
import axios from "axios";

interface SingIn {
  email_address: string;
  password: string;
}

export interface ErrorResponseType {
  data: any;
  message: string;
  success: boolean;
  status: number;
}
const schema = yup.object({
  email_address: yup.string().email().required(),
  password: yup.string().required(),
});

const SingIn = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<SingIn>({ resolver: yupResolver(schema) });

  // hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<ErrorResponseType | null>(null);

  // show password handler
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // Login Handler
  const onSubmit: SubmitHandler<SingIn> = async (data) => {
    const logindata = {
      email_address: data.email_address,
      password: data.password,
    };

    // login API call
    setLoading(true);
    dispatch(setProgress(0));
    try {
      const response = await axiosInstance.post(Auth.LOGIN, logindata);

      if (!response.data.success) throw new Error(response.data.message);

      // set value in localstorage
      localStorage.setItem("token", response.data?.data?.token);
      dispatch(setToken(response.data?.data?.token));

      // after that navigate dashboard
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errResponse: ErrorResponseType = error.response?.data;
        setErrorMsg(errResponse);
      }
    }
    dispatch(setProgress(100));
    setLoading(false);

    reset({
      email_address: "",
      password: "",
    });
  };

  return (
    <div className="">
      <Grid
        bgcolor={BgColor.grayWhite}
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", minWidth: "100%" }}
      >
        <Grid item>
          <Container
            sx={{
              p: 5,
              bgcolor: "#ffff",
              width: 400,
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src="http://dev.pcbclick.com:9000/assets/images/logo/logo.svg"
              alt="logo"
              width={60}
              height={60}
            />
            <Typography variant="h4" py={2}>
              Sing In
            </Typography>

            {/* form */}
            {errorMsg && <Alert severity="error">{errorMsg.message}</Alert>}
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                "& .MuiTextField-root": { my: 1 },
              }}
              autoComplete="off"
            >
              <Controller
                name="email_address"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors.email_address}
                    label="Email address"
                    value={field.value || ""}
                    fullWidth
                  />
                )}
              />
              <NotifyError error={errors?.email_address?.message} />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    error={!!errors?.password}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={field.value || ""}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleClickShowPassword}
                            edge="end"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                )}
              />

              <NotifyError error={errors?.password?.message} />
              <FormControlLabel control={<Checkbox />} label="Remember me" />

              <Typography>
                Don't have an account?
                <Link style={{ color: blue[500], marginLeft: 5 }} to={"#"}>
                  Sign up
                </Link>
              </Typography>

              <LoadingButton
                sx={{ marginTop: 3, borderRadius: 10, p: 2 }}
                fullWidth
                type="submit"
                loading={loading}
                variant="contained"
                disabled={loading}
              >
                <span>Sing In</span>
              </LoadingButton>
            </Box>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingIn;
