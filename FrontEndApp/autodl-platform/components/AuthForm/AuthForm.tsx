import React, { MouseEvent } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import LockIcon from "@material-ui/icons/Lock";
import { IoLogoGoogle } from "react-icons/io5";
import { makeStyles } from "@material-ui/core/styles";
import { signIn } from "next-auth/react";

const useStyles = makeStyles({
  formRoot: {
    marginTop: "8rem",
  },
  formContainer: {
    padding: "20px",
    margin: "25px",
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
    marginTop: "20px",
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
  },
  actionBtn: {
    margin: "30px 0px 10px 0px",
    paddingTop: "5px 0px",
    width: 200,
  },
  actionBtnLeft: {
    margin: "30px 10px 30px 0px",
    paddingTop: "5px 0px",
    flex: "1",
  },
  actionBtnRight: {
    margin: "30px 0px 30px 10px",
    paddingTop: "5px 0px",
    flex: "1",
  },
  googleLogin: {
    margin: "0",
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
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

type FormValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  otp: string;
};

export default function AuthForm() {
  const classes = useStyles();
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showProgress, setShowProgress] = React.useState<boolean>(false);
  const [otpResendText, setOtpResendText] = React.useState<
    "Resend OTP?" | "OTP sent successfully!"
  >("Resend OTP?");
  const [showOtpResendText, setShowOtpResendText] =
    React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
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

  const handleReceiveOtp = () => {
    setShowProgress(true);
    setTimeout(() => {
      setActiveForgotPassStep(1);
      setShowProgress(false);
    }, 1000);

    setTimeout(() => {
      setShowOtpResendText(true);
    }, 5000);
  };

  const handleResendOtp = () => {
    setShowProgress(true);
    setTimeout(() => {
      setShowProgress(false);
      setOtpResendText("OTP sent successfully!");
    }, 1500);
  };

  const handleVerifyOtp = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setActiveForgotPassStep(2);
      setShowProgress(false);
    }, 1500);
  };

  const handleNewPass = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setShowProgress(false);
      router.push("/home");
    }, 1500);
  };

  // Account Register Handlers
  const handleAuthRegister = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setAuthStep("register");
      setShowProgress(false);
    }, 1500);
  };

  const handleRegisterNext = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setActiveRegisterStep((prevStep) => prevStep + 1);
      setShowProgress(false);
    }, 1500);

    setTimeout(() => {
      setShowOtpResendText(true);
    }, 5000);
  };

  const handleRegisterBack = () => {
    setActiveRegisterStep((prevStep) => prevStep - 1);
  };

  const handleRegister = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setShowProgress(false);
      router.push("/home");
    }, 1500);
  };

  // Account Login Handler
  const handleLogin = (data: FormValues) => {
    setShowProgress(true);
    console.log(data);
    setTimeout(() => {
      setShowProgress(false);
      router.push("/home");
    }, 1500);
  };

  const handleGoogleSignIn = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    signIn("google");
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
                    >
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
            <Button
              type="submit"
              color="primary"
              variant="outlined"
              className={classes.googleLogin}
              onClick={(e) => handleGoogleSignIn(e)}
            >
              <IoLogoGoogle /> <span>Log in with google</span>
            </Button>
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
                    onClick={handleSubmit(handleReceiveOtp)}
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
                    onClick={handleResendOtp}
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
                        >
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
            <Stepper activeStep={activeRegisterStep} alternativeLabel>
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
                    onClick={handleSubmit(handleRegisterNext)}
                  >
                    Next
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

                <Typography className={classes.helperTextAlt}>
                  We have sent you an OTP at your Email Address.
                </Typography>

                <br />

                {showOtpResendText && (
                  <Typography
                    className={classes.helperText}
                    onClick={handleResendOtp}
                  >
                    {otpResendText}
                  </Typography>
                )}

                <div className={classes.actionBtnGrp}>
                  <Button
                    onClick={handleRegisterBack}
                    variant="outlined"
                    color="primary"
                    className={classes.actionBtnLeft}
                  >
                    Go Back
                  </Button>
                  <Button
                    color="primary"
                    variant="contained"
                    className={classes.actionBtnRight}
                    onClick={handleSubmit(handleRegister)}
                  >
                    Finish
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </Box>
    </Paper>
  );
}
