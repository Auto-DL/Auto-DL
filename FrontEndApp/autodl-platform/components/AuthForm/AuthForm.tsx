import React from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import Snackbar from "@mui/material/Snackbar";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockIcon from "@mui/icons-material/Lock";
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import makeStyles from '@mui/styles/makeStyles';

import { FormValues } from "./AuthModel";
import AuthService from "./AuthService";
import { useAppDispatch } from "app/hooks";
import { updateUser } from "app/userSlice";

const useStyles = makeStyles({
  formRoot: {
    marginTop: "8rem",
  },
  formContainer: {
    padding: "20px",
  },
  formHeaderText: {
    textAlign: "center",
    paddingTop: "5px",
    paddingBottom: "20px",
  },
  formElement: {
    margin: "15px 0px",
  },
  otpElement: {
    margin: "15px 0px",
    "& .MuiInputBase-input": {
      letterSpacing: "38px",
    },
  },
  helperText: {
    fontSize: "100%",
    marginTop: "10px",
    cursor: "pointer",
    textDecoration: "underline",
    display: "inline-block",
  },
  helperTextAlt: {
    fontSize: "90%",
    marginTop: "20px",
    cursor: "default",
    display: "inline-block",
  },
  actionBtnGrp: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "20px",
  },
  actionBtn: {
    margin: "30px 0px 10px 0px",
    paddingTop: "5px 0px",
    width: 200,
  },
  actionBtnLeft: {
    margin: "30px 10px 30px 0px",
    paddingTop: "5px 0px",
    width: 200,
  },
  actionBtnRight: {
    margin: "30px 0px 30px 10px",
    paddingTop: "5px 0px",
    width: 200,
  },
  radioBtnGrp: {
    padding: "10px 0px",
  },
  legend: {
    paddingTop: "20px",
    paddingBottom: "5px",
  },
  stepper: {
    padding: "20px 0px 30px 0px",
  },
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref,) {
  return <MuiAlert elevation={6} ref={ref} variant="outlined" {...props} />;
});

export default function AuthForm() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showProgress, setShowProgress] = React.useState<boolean>(false);
  const [showOtpResendText, setShowOtpResendText] =
    React.useState<boolean>(false);
  const [otpResendText, setOtpResendText] = React.useState<
    "Send OTP?" | "Resend OTP?" | "OTP sent successfully!"
  >("Send OTP?");
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState({
    message: "This is alert msg",
    severity: "warning",
  });

  const handleAlertClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  // Main Auth Steps
  const [authStep, setAuthStep] = React.useState<
    "login" | "register" | "forgotPass"
  >("login");

  // Forgot Pass Steps
  const [activeForgotPassStep, setActiveForgotPassStep] =
    React.useState<number>(0);
  const forgotPassSteps = ["Receive OTP", "Confirm OTP", "New Password"];

  // Register Steps
  const [activeRegisterStep, setActiveRegisterStep] = React.useState<number>(0);
  const registerSteps = ["Account Details", "Verify Account"];

  const resetState = () => {
    setAuthStep("login");
    setActiveForgotPassStep(0);
    setActiveRegisterStep(0);
    setOtpResendText("Send OTP?");
    setOpenAlert(false);
    setShowPassword(false);
    setShowProgress(false);
    setShowOtpResendText(false);
    reset();
  };

  const handleClickShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // Forgot Pass Handlers
  const handleAuthForgotPass = () => {
    setShowProgress(true);
    setTimeout(() => {
      setAuthStep("forgotPass");
      setShowProgress(false);
    }, 1000);
  };

  const handleSendPasswordOtp = (data: FormValues) => {
    setShowProgress(true);
    AuthService.forgotPassword(data.username).then((response) => {
      setAlert({
        message: response.message ? response.message : "",
        severity: response.status ? "success" : "error",
      });
      setActiveForgotPassStep(1);
      setOpenAlert(true);
      setShowProgress(false);
    });
    setTimeout(() => {
      setShowOtpResendText(true);
    }, 5000);
  };

  const handleSendEmailOtp = (data: FormValues) => {
    setShowProgress(true);
    AuthService.verifyEmail(data.username).then((response) => {
      setAlert({
        message: response.message ? response.message : "",
        severity: response.status ? "success" : "error",
      });
      setOpenAlert(true);
      setOtpResendText("OTP sent successfully!");
      setShowProgress(false);
    });
  };

  const handleVerifyOtp = (data: FormValues) => {
    setShowProgress(true);
    AuthService.verifyOTP(data.username, data.otp).then((response) => {
      setAlert({
        message: response.message ? response.message : "",
        severity: response.status ? "success" : "error",
      });
      if (response.status) {
        setActiveForgotPassStep(2);
      }
      setOpenAlert(true);
      setShowProgress(false);
    });
  };

  const handleNewPass = (data: FormValues) => {
    setShowProgress(true);
    AuthService.updatePassword(data.username, data.password).then(
      (response) => {
        setAlert({
          message: response.message ? response.message : "",
          severity: response.status ? "success" : "error",
        });
        setOpenAlert(true);
        if (response.status) {
          router.push("/home");
          resetState();
        }
        setShowProgress(false);
      }
    );
  };

  // Account Register Handlers
  const handleAuthRegister = () => {
    setShowProgress(true);
    setTimeout(() => {
      setAuthStep("register");
      setShowProgress(false);
    }, 1500);
  };

  const handleRegister = (data: FormValues) => {
    setShowProgress(true);
    AuthService.register(data).then((response) => {
      if (response.status) {
        setAlert({
          message: response.message ? response.message : "",
          severity: "success",
        });
        dispatch(updateUser({ username: data.username }));
        setOpenAlert(true);
      } else {
        setAlert({
          message: response.message ? response.message : "",
          severity: "error",
        });
        setOpenAlert(true);
      }
      setShowProgress(false);
      setActiveRegisterStep((prevStep) => prevStep + 1);
      handleSendEmailOtp(data);
    });
  };

  const handleLater = () => {
    router.push("/home");
    resetState();
  };

  const handleVerifyAccount = (data: FormValues) => {
    setShowProgress(true);
    AuthService.verifyOTP(data.username, data.otp).then((response) => {
      setAlert({
        message: response.message ? response.message : "",
        severity: response.status ? "success" : "error",
      });
      if (response.status) {
        router.push("/home");
      }
      setOpenAlert(true);
      setShowProgress(false);
    });
  };

  // Account Login Handler
  const handleLogin = (data: FormValues) => {
    setShowProgress(true);
    AuthService.login(data).then((response) => {
      if (response.status) {
        setAlert({
          message: response.message ? response.message : "",
          severity: "success",
        });
        dispatch(updateUser({ username: data.username }));
        setOpenAlert(true);
        router.push("/home");
      } else {
        setAlert({
          message: response.message ? response.message : "",
          severity: "error",
        });
        setOpenAlert(true);
      }
      setShowProgress(false);
    });
  };

  return (
    <Paper elevation={3} className={classes.formRoot}>
      {showProgress && <LinearProgress color="primary" />}
      <Box
        component="form"
        className={classes.formContainer}
        onSubmit={handleSubmit(handleLogin)}
      >
        {authStep === "login" && (
          <>
            <Typography
              variant="h4"
              component="h2"
              className={classes.formHeaderText}
            >
              Sign In
            </Typography>

            <TextField
              autoFocus
              id="username"
              variant="outlined"
              label="Enter Username"
              fullWidth
              className={classes.formElement}
              {...register("username", {
                required: "This field is Required",
                minLength: { value: 4, message: "Username is too short" },
                maxLength: { value: 20, message: "Username is too long" },
              })}
              error={errors?.username && true}
              helperText={errors?.username && errors.username.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              id="password"
              variant="outlined"
              label="Enter Password"
              type={showPassword ? "text" : "password"}
              fullWidth
              className={classes.formElement}
              {...register("password", {
                required: "This field is Required",
                minLength: { value: 4, message: "Password is too short" },
                maxLength: { value: 20, message: "Password is too long" },
              })}
              error={errors?.password && true}
              helperText={errors?.password && errors.password.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large">
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography
              className={classes.helperText}
              onClick={handleAuthForgotPass}
            >
              Forgot your password?
            </Typography>

            <div className={classes.actionBtnGrp}>
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                className={classes.actionBtnLeft}
              >
                Log in
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={classes.actionBtnRight}
                onClick={handleSubmit(handleAuthRegister)}
              >
                Register
              </Button>
            </div>
          </>
        )}

        {authStep === "forgotPass" && (
          <>
            <Stepper
              activeStep={activeForgotPassStep}
              alternativeLabel
              className={classes.stepper}
            >
              {forgotPassSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeForgotPassStep === 0 && (
              <>
                <TextField
                  autoFocus
                  id="username"
                  variant="outlined"
                  label="Enter Username"
                  fullWidth
                  className={classes.formElement}
                  {...register("username", {
                    required: "This field is Required",
                    minLength: { value: 4, message: "Username is too short" },
                    maxLength: { value: 20, message: "Username is too long" },
                  })}
                  error={errors?.username && true}
                  helperText={errors?.username && errors.username.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AlternateEmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography className={classes.helperTextAlt}>
                  You will be receiveing an OTP on your registered Email
                  Address.
                </Typography>

                <div className={classes.actionBtnGrp}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.actionBtnLeft}
                    onClick={() => setAuthStep("login")}
                  >
                    Go Back
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtnRight}
                    onClick={handleSubmit(handleSendPasswordOtp)}
                  >
                    Receive OTP
                  </Button>
                </div>
              </>
            )}

            {activeForgotPassStep === 1 && (
              <>
                <TextField
                  autoFocus
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  variant="outlined"
                  placeholder="000000"
                  className={classes.otpElement}
                  {...register("otp", {
                    required: "This field is Required",
                    maxLength: { value: 6, message: "OTP is invalid" },
                  })}
                  error={errors?.otp ? true : false}
                  helperText={errors?.otp && errors.otp.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                {showOtpResendText && (
                  <Typography
                    className={classes.helperText}
                    onClick={handleSubmit(handleSendPasswordOtp)}
                  >
                    {otpResendText}
                  </Typography>
                )}

                <div className={classes.actionBtnGrp}>
                  <Button
                    color="primary"
                    variant="outlined"
                    className={classes.actionBtnLeft}
                    onClick={() => setActiveForgotPassStep(0)}
                  >
                    Go Back
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtnRight}
                    onClick={handleSubmit(handleVerifyOtp)}
                  >
                    Verify OTP
                  </Button>
                </div>
              </>
            )}

            {activeForgotPassStep === 2 && (
              <>
                <TextField
                  autoFocus
                  id="password"
                  variant="outlined"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  className={classes.formElement}
                  {...register("password", {
                    required: "This field is Required",
                    minLength: { value: 4, message: "Password is too short" },
                    maxLength: { value: 20, message: "Password is too long" },
                  })}
                  error={errors?.password && true}
                  helperText={errors?.password && errors.password.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          size="large">
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <div className={classes.actionBtnGrp}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtn}
                    onClick={handleSubmit(handleNewPass)}
                  >
                    Confirm
                  </Button>
                </div>
              </>
            )}
          </>
        )}

        {authStep === "register" && (
          <>
            <Stepper
              activeStep={activeRegisterStep}
              alternativeLabel
              className={classes.stepper}
            >
              {registerSteps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {activeRegisterStep === 0 && (
              <>
                <TextField
                  autoFocus
                  variant="outlined"
                  id="firstName"
                  label="Enter First Name"
                  fullWidth
                  className={classes.formElement}
                  {...register("firstName", {
                    required: "This field is Required",
                  })}
                  error={errors?.firstName && true}
                  helperText={errors?.firstName && errors.firstName.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  id="lastName"
                  variant="outlined"
                  label="Enter Last Name"
                  className={classes.formElement}
                  {...register("lastName", {
                    required: "This field is Required",
                  })}
                  error={errors?.lastName && true}
                  helperText={errors?.lastName && errors.lastName.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  fullWidth
                  id="email"
                  label="Enter Email Address"
                  variant="outlined"
                  className={classes.formElement}
                  {...register("email", {
                    required: "This field is Required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: "Not a valid Email Address",
                    },
                  })}
                  error={errors?.email && true}
                  helperText={errors?.email && errors.email.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <br />

                <Typography
                  className={classes.helperText}
                  onClick={() => setAuthStep("login")}
                >
                  Already have an account?
                </Typography>

                <div className={classes.actionBtnGrp}>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtn}
                    onClick={handleSubmit(handleRegister)}
                  >
                    Create account
                  </Button>
                </div>
              </>
            )}

            {activeRegisterStep === 1 && (
              <>
                <TextField
                  autoFocus
                  fullWidth
                  id="otp"
                  label="Enter OTP"
                  variant="outlined"
                  placeholder="000000"
                  className={classes.otpElement}
                  {...register("otp", {
                    maxLength: { value: 6, message: "OTP is invalid" },
                  })}
                  error={errors?.otp ? true : false}
                  helperText={errors?.otp && errors.otp.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                />

                <Typography className={classes.helperTextAlt}>
                  We have sent you an OTP at your Email Address.
                </Typography>

                <br />

                {showOtpResendText && (
                  <Typography
                    className={classes.helperText}
                    onClick={handleSubmit(handleSendEmailOtp)}
                  >
                    {otpResendText}
                  </Typography>
                )}

                <div className={classes.actionBtnGrp}>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.actionBtn}
                    onClick={handleLater}
                  >
                    Later
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtn}
                    onClick={handleSubmit(handleVerifyAccount)}
                  >
                    Verify
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Box>
      <Snackbar
        open={openAlert}
        data-testid={"warning"}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity == "success" ? "success" : "error"}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
}
