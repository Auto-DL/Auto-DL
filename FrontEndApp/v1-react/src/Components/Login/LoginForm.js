import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import LoginService from "./LoginService";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import { useHistory } from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginForm() {
  const history = useHistory();
  var username = JSON.parse(localStorage.getItem("username"));
  if (username !== null) {
    history.push("/home");
  }

  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = React.useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirmpassword: "",
    showPassword: false,
  });

  const [open, setOpen] = React.useState(false);
  const [alert, setalert] = React.useState({
    msg: "This is alert msg",
    severity: "warning",
  });

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };

  const login = async () => {
    const data = {
      username: values.username,
      password: values.password,
    };
    // vallidation
    if (values.username !== "" && values.password !== "") {
      const res = await LoginService.login(data);
      if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });

        localStorage.setItem("username", JSON.stringify(res.data.user));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        // history.push("/home");
        window.location.reload();
      } else {
        setalert({ ...values, msg: res.data.message, severity: "error" });
      }
    } else {
      setalert({
        ...values,
        msg: "Please fill all the details",
        severity: "warning",
      });
    }
    setOpen(true);
  };

  const register = async () => {
    const data = {
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
    };
    // vallidation
    if (
      values.username !== "" &&
      values.password !== "" &&
      values.first_name !== "" &&
      values.last_name !== "" &&
      values.email !== "" &&
      values.password === values.confirmpassword
    ) {
      const res = await LoginService.register(data);
      if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });

        localStorage.setItem("username", JSON.stringify(res.data.username));
        localStorage.setItem("token", JSON.stringify(res.data.token));
        // history.push("/home");
        window.location.reload();
      } else {
        setalert({ ...values, msg: res.data.message, severity: "error" });
      }
    } else {
      setalert({
        ...values,
        msg: "Please fill all the details",
        severity: "warning",
      });
    }
    setOpen(true);
  };

  return (
    <>
      <br />
      <br />

      <Grid container>
        <Grid item lg={4} md={4} sm={1} xs={1}></Grid>

        <Grid item lg={4} md={4} sm={10} xs={10}>
          <div className={classes.root}>
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChangetabs}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
                aria-label="full width tabs example"
              >
                <Tab label="Login" {...a11yProps(0)} />
                <Tab label="Register" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0} dir={theme.direction}>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="Username"
                    label="Username"
                    name="Username"
                    autoComplete="Username"
                    autoFocus
                    onChange={handleChange("username")}
                  />

                  <FormControl fullWidth margin="normal" variant="filled">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password *
                    </InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <br />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={login}
                  >
                    LOGIN
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <Grid container>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Username"
                    autoComplete="Username"
                    autoFocus
                    onChange={handleChange("username")}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="First name"
                    autoComplete="First name"
                    onChange={handleChange("first_name")}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Last name"
                    autoComplete="Last name"
                    onChange={handleChange("last_name")}
                  />

                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="email"
                    autoComplete="email"
                    onChange={handleChange("email")}
                  />

                  <FormControl fullWidth margin="normal" variant="filled">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password *
                    </InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <FormControl fullWidth margin="normal" variant="filled">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password *
                    </InputLabel>
                    <OutlinedInput
                      type={values.showPassword ? "text" : "password"}
                      value={values.confirmpassword}
                      onChange={handleChange("confirmpassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>

                  <Grid container>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <br />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={register}
                  >
                    Register
                  </Button>
                </Grid>
              </Grid>
            </TabPanel>
          </div>
        </Grid>
        <Grid item lg={4} md={4} sm={1} xs={1}></Grid>
      </Grid>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.msg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default LoginForm;
