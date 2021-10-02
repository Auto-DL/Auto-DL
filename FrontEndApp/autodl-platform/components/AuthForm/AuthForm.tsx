import React from "react";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import AccountCircle from "@material-ui/icons/AccountCircle";
import EmailIcon from "@material-ui/icons/Email";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles } from "@material-ui/core/styles";

import { UserState, ErrorState } from "./AuthModel";
import AuthService from "./AuthService";
import { useAppDispatch } from "app/hooks";
import { login } from "components/AuthForm/AuthSlice";
import { route } from "next/dist/server/router";

const useStyles = makeStyles({
  formRoot: {
    flexGrow: 1,
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
    marginTop: "15px",
    marginBottom: "15px",
  },
  helperText: {
    fontSize: "100%",
    marginTop: "20px",
    cursor: "pointer",
    textDecoration: "underline",
    display: "inline-block",
  },
  actionBtnGrp: {
    display: "flex",
    justifyContent: "space-evenly",
    padding: "20px",
  },
  actionBtn: {
    margin: "12px",
    paddingTop: "5px",
    paddingBottom: "5px",
    width: 200,
  },
  radioBtnGrp: {
    padding: "10px 0px",
  },
  legend: {
    paddingTop: "20px",
    paddingBottom: "5px",
  },
});

export default function AuthForm() {
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [values, setValues] = React.useState<UserState>({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    accountType: "user",
  });

  const [errors, setErrors] = React.useState<ErrorState>({
    username: false,
    password: false,
    email: false,
    firstName: false,
    lastName: false,
  });

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [showProgress, setShowProgress] = React.useState<boolean>(false);
  const [authStep, setAuthStep] = React.useState<number>(0);
  const [activeRegisterStep, setActiveRegisterStep] = React.useState<number>(0);

  const registerSteps = ["Account Type", "Account Details"];

  const handleRegisterNext = () => {
    setShowProgress(true);
    setTimeout(() => {
      setActiveRegisterStep((prevStep) => prevStep + 1);
      setShowProgress(false);
    }, 1500);
  };

  const handleRegisterBack = () => {
    setActiveRegisterStep((prevStep) => prevStep - 1);
  };

  const handleChange =
    (prop: keyof UserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setShowPassword((value) => !value);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  // const handleErrors = () => {
  //   for (const [key, val] of Object.entries(values)) {
  //     if (val.length === 0) {
  //       setErrors({ ...errors, [key]: true });
  //       setShowProgress(false);
  //     } else {
  //       setErrors({ ...errors, [key]: false });
  //     }
  //   }
  // }

  const handleAuthStep = () => {
    setShowProgress(true);
    // handleErrors();
    setTimeout(() => {
      setAuthStep(1);
      setShowProgress(false);
    }, 1500);
  };

  const handleLogin = () => {
    setShowProgress(true);
    // handleErrors();
    AuthService.login(values).then((loggedIn) => {
      console.log(loggedIn);
      if (loggedIn) {
        dispatch(login());
        router.push("/home");
      }
    });
  };

  const handleRegister = () => {
    setShowProgress(true);
    // handleErrors();
    AuthService.register(values).then((loggedIn) => {
      if (loggedIn) {
        dispatch(login());
        router.push("/home");
      }
    });
  };

  return (
    <Paper elevation={3} className={classes.formRoot}>
      {showProgress && <LinearProgress color="primary" />}
      <Box component="form" className={classes.formContainer}>
        {authStep === 0 && (
          <>
            <Typography
              variant="h4"
              component="h2"
              className={classes.formHeaderText}
            >
              Sign In
            </Typography>

            <TextField
              id="username"
              name="username"
              label="Username"
              fullWidth
              className={classes.formElement}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
              autoFocus
              onChange={handleChange("username")}
              value={values.username}
              error={errors.username}
              variant="outlined"
            />

            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formElement}
            >
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                onChange={handleChange("password")}
                value={values.password}
                error={errors.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>

            <Typography className={classes.helperText}>
              Forgot your password?
            </Typography>

            <div className={classes.actionBtnGrp}>
              <Button
                color="primary"
                variant="outlined"
                className={classes.actionBtn}
                onClick={handleLogin}
              >
                Log in
              </Button>
              <Button
                color="primary"
                variant="contained"
                className={classes.actionBtn}
                onClick={handleAuthStep}
              >
                Register
              </Button>
            </div>
          </>
        )}
        {authStep === 1 && (
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
                <FormControl component="fieldset">
                  <FormLabel component="legend" className={classes.legend}>
                    This account is for...
                  </FormLabel>
                  <RadioGroup
                    aria-label="user-type"
                    name="User Type"
                    value={values.accountType}
                    onChange={handleChange("accountType")}
                    className={classes.radioBtnGrp}
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio color="primary" />}
                      label="An Individual"
                    />
                    <FormControlLabel
                      value="organization"
                      disabled
                      control={<Radio color="primary" />}
                      label="An Organization"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Typography
                  className={classes.helperText}
                  onClick={() => setAuthStep(0)}
                >
                  Already have an account?
                </Typography>
              </>
            )}

            {activeRegisterStep === 1 && (
              <>
                <TextField
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  className={classes.formElement}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  autoFocus
                  onChange={handleChange("firstName")}
                  error={errors.firstName}
                  value={values.firstName}
                  variant="outlined"
                />

                <TextField
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  className={classes.formElement}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  autoComplete="First Name"
                  onChange={handleChange("lastName")}
                  error={errors.lastName}
                  value={values.lastName}
                  variant="outlined"
                />

                <TextField
                  id="email"
                  name="email"
                  label="Email Address"
                  fullWidth
                  className={classes.formElement}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange("email")}
                  error={errors.email}
                  value={values.email}
                  variant="outlined"
                />
              </>
            )}

            <div className={classes.actionBtnGrp}>
              <Button
                disabled={activeRegisterStep === 0}
                onClick={handleRegisterBack}
                variant="outlined"
                color="primary"
                className={classes.actionBtn}
              >
                Back
              </Button>
              {activeRegisterStep === 0 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleRegisterNext}
                  className={classes.actionBtn}
                >
                  Next
                </Button>
              )}
              {activeRegisterStep === 1 && (
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.actionBtn}
                  onClick={handleRegister}
                >
                  Finish
                </Button>
              )}
            </div>
          </>
        )}
      </Box>
    </Paper>
  );
}
