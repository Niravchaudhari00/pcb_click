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
import { useEffect, useState } from "react";
import {
  SettingsOutlined,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { rootState, useAppDispatch } from "../redux/store";
import { getAuth } from "../redux/slice/AuthSlice";
import useToken from "../utils/features/setTokenInCookie";

interface UserInformation {
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
  } = useForm<UserInformation>({ resolver: yupResolver(schema) });

  // hooks
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInformation | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { loading, token } = useSelector((state: rootState) => state.auth);

  // show password handler
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  // authtoken

  useEffect(() => {
    if (userInfo !== null) {
      dispatch(getAuth(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);
  // Login Handler
  const onSubmit: SubmitHandler<UserInformation> = async (data) => {
    const loginData = {
      email_address: data.email_address,
      password: data.password,
    };
    setUserInfo(loginData);
    reset();
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
            {/* {errorMsg && <Alert severity="error">{errorMsg.message}</Alert>} */}
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
