import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import HomeService from "./HomeService";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  IndexRoute,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
    marginTop: "20px",
  },
}));

function Step1() {
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));
  const history = useHistory();
  const classes = useStyles();
  const [values, setValues] = React.useState({
    Project_Name: "",
    data_dir: "",
    language: "Python",
    task: "Classification",
    library: "Keras",
    output_file_name: "",
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

  const cancle = () => {
    history.push("/home");
  };

  const next = async () => {
    console.log(values);
    const data = {
      language: values.language,
      library: values.library,
      project_name: values.Project_Name,
      task: values.task,
      path: values.data_dir,
      output_file_name: values.output_file_name,
      username: username,
    };
    console.log(data);
    console.log(token);
    // vallidation
    if (
      values.Project_Name !== "" &&
      values.path !== "" &&
      values.output_file_name !== ""
    ) {
      const res = await HomeService.step_1(token, data);
      if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });

        history.push("/home");
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

        <Grid item lg={3} md={3} sm={10} xs={10}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Project Name"
            size="small"
            autoComplete="Project Name"
            autoFocus
            onChange={handleChange("Project_Name")}
          />

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Language</InputLabel>
            <Select
              value={values.language}
              onChange={handleChange("language")}
              label="Language"
            >
              <MenuItem value={"Python"}>Python</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Library</InputLabel>
            <Select
              value={values.library}
              onChange={handleChange("library")}
              label="Library"
            >
              <MenuItem value={"Keras"}>Keras</MenuItem>
              <MenuItem value={"Pytorch"}>Pytorch</MenuItem>
            </Select>
          </FormControl>

          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Task</InputLabel>
            <Select
              value={values.task}
              onChange={handleChange("task")}
              label="Task"
            >
              <MenuItem value={"Classification"}>Classification</MenuItem>
              <MenuItem value={"Regression"}>Regression</MenuItem>
              <MenuItem value={"Unsupervised"}>Unsupervised</MenuItem>
            </Select>
          </FormControl>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Data directory"
            size="small"
            autoComplete="Data directory"
            onChange={handleChange("data_dir")}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Output File Name"
            size="small"
            autoComplete="Output File Name"
            onChange={handleChange("output_file_name")}
          />

          <Grid container>
            <Grid item lg={4} md={4} sm={4} xs={4}>
              <br />
            </Grid>
          </Grid>
          <Grid container>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Button
                fullWidth
                variant="contained"
                color="default"
                onClick={cancle}
              >
                Cancle
              </Button>
            </Grid>

            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

            <Grid item lg={4} md={4} sm={4} xs={4}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={next}
              >
                Next
              </Button>
            </Grid>

            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
          </Grid>
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

export default Step1;
