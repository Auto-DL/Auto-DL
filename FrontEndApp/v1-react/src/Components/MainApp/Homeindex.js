import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Switch,
  useLocation,
  IndexRoute,
  Route,
  Link,
  Redirect,
  useParams,
  useHistory,
} from "react-router-dom";
import HomeService from "./HomeService";
import Project_table from "./Project_table";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

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

function Home() {
  const history = useHistory();
  var token = JSON.parse(localStorage.getItem("token"));
  var username = JSON.parse(localStorage.getItem("username"));

  const [AllProjects, setAllProjects] = useState([]);

  const Logout = () => {
    localStorage.clear();
    history.push("/login");
  };

  const classes = useStyles();
  const [values, setValues] = React.useState({
    project_name: "",
    data_dir: "",
    language: "Python",
    task: "Classification",
    library: "Keras",
    output_file_name: "",
  });
  const [SelectedProject, setSelectedProject] = React.useState({});
  const [IsEdit, setIsEdit] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const handleClickOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

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

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
      };
      console.log(token, data);
      const res = await HomeService.get_all(token, data);

      if (res.status === 200) {
        setAllProjects([...res.data.projects]);
      } else {
        localStorage.clear();
        history.push("/login");
      }
    }
    fetchData();
  }, [openModal]);

  const handlestep = async (proj) => {
    var data = {
      project_id: proj.project_id,
      username: username,
    };
    var res = await HomeService.get_project(token, data);
    console.log(res);
    localStorage.setItem("json_data", JSON.stringify(res.data.b2f_json));
    localStorage.setItem("project_details", JSON.stringify(proj));
    history.push("/step-2");
  };

  const parent_call_on_delete = () => {
    setOpenModal(true);
    setOpenModal(false);
  };
  const create_new_project = () => {
    setOpenModal(true);
    setIsEdit(false);
    setValues({
      ...values,
      project_name: "",
      data_dir: "",
      language: "Python",
      task: "Classification",
      library: "Keras",
      output_file_name: "",
    });
  };
  const editproject = (proj) => {
    console.log(proj);
    console.log(proj.lang);
    console.log(proj.lib);

    setSelectedProject(proj);
    setValues({
      ...values,
      project_name: proj.project_name,
      data_dir: proj.data_dir,
      language: proj.lang,
      task: proj.task,
      library: proj.lib,
      output_file_name: proj.output_file_name,
    });
    setIsEdit(true);
    console.log(values);
    setOpenModal(true);
  };

  const handleCloseModalSave = async () => {
    // vallidation
    if (
      values.project_name !== "" &&
      values.path !== "" &&
      values.output_file_name !== ""
    ) {
      if (IsEdit) {
        var data = {
          // 'language':values.language,
          // 'library':values.library,
          project_name: values.project_name,
          project_id: SelectedProject.project_id,
          data_dir: values.data_dir,
          output_file_name: values.output_file_name,
          username: username,
        };
        console.log(data);
        var res = await HomeService.edit_project(token, data);
      } else {
        var data = {
          language: values.language,
          library: values.library,
          project_name: values.project_name,
          task: values.task,
          path: values.data_dir,
          output_file_name: values.output_file_name,
          username: username,
        };
        var res = await HomeService.create_project(token, data);
      }
      if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });
        localStorage.setItem("project_details", JSON.stringify(data));
        history.push("/step-2");
        // history.push("/home");
      } else {
        setalert({ ...values, msg: res.data.message, severity: "error" });
      }
      setOpenModal(false);
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
      home
      <br />
      <p onClick={Logout}>Logout</p>
      <br />
      <br />
      <br />
      <Dialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={openModal}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleCloseModal}>
          Project details
        </DialogTitle>
        <DialogContent dividers>
          {IsEdit ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={values.project_name}
              label="Project Name"
              size="small"
              autoComplete="Project Name"
              autoFocus
              onChange={handleChange("project_name")}
            />
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Project Name"
              size="small"
              autoComplete="Project Name"
              autoFocus
              onChange={handleChange("project_name")}
            />
          )}

          {IsEdit ? (
            <FormControl
              variant="outlined"
              disabled
              className={classes.formControl}
            >
              <InputLabel>Language</InputLabel>
              <Select
                value={values.language}
                onChange={handleChange("language")}
                label="Language"
              >
                <MenuItem value={"Python"}>Python</MenuItem>
              </Select>
            </FormControl>
          ) : (
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
          )}

          {IsEdit ? (
            <FormControl
              variant="outlined"
              disabled
              className={classes.formControl}
            >
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
          ) : (
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
          )}

          {IsEdit ? (
            <FormControl
              variant="outlined"
              disabled
              className={classes.formControl}
            >
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
          ) : (
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
          )}

          {IsEdit ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Data directory"
              size="small"
              defaultValue={values.data_dir}
              autoComplete="Data directory"
              onChange={handleChange("data_dir")}
            />
          ) : (
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
          )}

          {IsEdit ? (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={values.output_file_name}
              label="Output File Name"
              size="small"
              autoComplete="Output File Name"
              onChange={handleChange("output_file_name")}
            />
          ) : (
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
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModalSave} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

        <Grid item lg={10} md={10} sm={10} xs={10}>
          <Project_table
            projects={AllProjects}
            editproject={editproject}
            parent_call_on_delete={parent_call_on_delete}
            handlestep={handlestep}
            create_new_project={create_new_project}
          />
        </Grid>

        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.msg}
        </Alert>
      </Snackbar>
      <br />
    </>
  );
}

export default Home;
