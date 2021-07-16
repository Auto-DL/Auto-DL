import React, { useState, useEffect } from "react";
import { BrowserRouter, Switch, useLocation, IndexRoute, Route, Link, Redirect, useParams, useHistory } from "react-router-dom";
import { Grid, CircularProgress, Backdrop, Select, MenuItem, Snackbar, Button, TextField, FormControlLabel, FormLabel, Input, FormGroup, Checkbox, FormHelperText, InputLabel, FormControl, Dialog, Typography, IconButton } from "@material-ui/core";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import CloseIcon from "@material-ui/icons/Close";
import HomeService from "./HomeService";
import ProjectTable from "./ProjectTable";

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
  cloneFormControl: {
    margin: theme.spacing(0),
    minWidth: "100%",
    marginTop: "20px",
    marginBottom: "20px",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function Home() {
  const history = useHistory();
  var token = JSON.parse(localStorage.getItem("token"));
  var username = JSON.parse(localStorage.getItem("username"));

  const [AllProjects, setAllProjects] = useState([]);

  const classes = useStyles();
  const [values, setValues] = React.useState({
    project_name: "",
    project_description: "",
    data_dir: "",
    language: "Python",
    task: "Classification",
    library: "Keras",
    output_file_name: "",
  });
  const [SelectedProject, setSelectedProject] = React.useState({});
  const [IsEdit, setIsEdit] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const [cloneStep, setCloneStep] = useState(0);
  const [openCloneModal, setOpenCloneModal] = useState(false);
  const [cloneOptions, setCloneOptions] = useState({
    modelLayers: false,
    preprocessingParameters: false,
    hyperParameters: false,
  });

  const { modelLayers, preprocessingParameters, hyperParameters } = cloneOptions;
  
  const handleCloneChange = (event) => {
    setCloneOptions({ ...cloneOptions, [event.target.name]: event.target.checked });
  };

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

  const [open_backdrop, setOpen_backdrop] = React.useState(false);

  const handleClose_backdrop = () => {
    setOpen_backdrop(false);
  };

  const handleToggle_backdrop = (state) => {
    setOpen_backdrop(state);
  };

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
      };

      handleToggle_backdrop(true);
      const res = await HomeService.get_all(token, data);

      if (res.status === 200) {
        handleToggle_backdrop(false);
        setAllProjects([...res.data.projects]);
      } else {
        localStorage.clear();
        history.push("/login");
      }
    } 
    fetchData();
  }, [openModal, openCloneModal, history, token, username]);

  const handlestep = async (proj) => {
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
      project_description: "",
      data_dir: "",
      language: "python",
      task: "Classification",
      library: "Keras",
      output_file_name: "",
    });
  };
  const editproject = (proj) => {
    setSelectedProject(proj);
    setValues({
      ...values,
      project_name: proj.project_name,
      project_description: proj.project_description,
      data_dir: proj.data_dir,
      language: proj.lang,
      task: proj.task,
      library: proj.lib,
      output_file_name: proj.output_file_name,
    });
    setIsEdit(true);

    setOpenModal(true);
  };

  const cloneProject = (proj) => {
    setSelectedProject(proj);
    setValues({
      ...values,
      project_name: proj.project_name,
      project_description: proj.project_description,
      data_dir: proj.data_dir,
      language: proj.lang,
      task: proj.task,
      library: proj.lib,
      output_file_name: proj.output_file_name,
    });
    setOpenCloneModal(true);
  };

  const handleCloseCloneModal = () => {
    setOpenCloneModal(false);
    setCloneStep(0);
    setCloneOptions({
      hyperParameters: false,
      preprocessingParameters: false,
      modelLayers: false
    });
  }

  const handleSaveClone = async () => {    
    var data = {
      language: values.language,
      library: values.library,
      project_name: values.project_name,
      project_id: SelectedProject.project_id,
      project_description: values.project_description,
      task: values.task,
      path: values.data_dir,
      output_file_name: values.output_file_name,
      username: username,
      model_layers: cloneOptions.modelLayers,
      preprocessing_parameters: cloneOptions.preprocessingParameters,
      hyper_parameters: cloneOptions.hyperParameters,
    };

    var res = await HomeService.clone_project(token, data);
    
    if (res.status === 200) {
      setalert({ ...values, msg: res.data.message, severity: "success" });
      localStorage.setItem("project_details", JSON.stringify(data));
    } else {
      setalert({ ...values, msg: res.data.message, severity: "error" });
    }
    
    setCloneStep(0);
    setOpenCloneModal(false);
    setOpen(true);
  }

  const handleCloseModalSave = async () => {
    // vallidation
    if (
      values.project_name !== "" &&
      values.project_description !== "" &&
      values.path !== "" &&
      values.output_file_name !== ""
    ) {
      if (IsEdit) {
        var data = {
          project_name: values.project_name,
          project_description: values.project_description,
          project_id: SelectedProject.project_id,
          data_dir: values.data_dir,
          output_file_name: values.output_file_name,
          username: username,
        };

        var res = await HomeService.edit_project(token, data);
      } else {
        data = {
          language: values.language,
          library: values.library,
          project_name: values.project_name,
          project_description: values.project_description,
          task: values.task,
          path: values.data_dir,
          output_file_name: values.output_file_name,
          username: username,
        };
        res = await HomeService.create_project(token, data);
      }
      if (res.status === 200) {
        setalert({ ...values, msg: res.data.message, severity: "success" });
        localStorage.setItem("project_details", JSON.stringify(data));
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
      <Backdrop
        className={classes.backdrop}
        open={open_backdrop}
        onClick={handleClose_backdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Clone existing Projects */}
      
      <Dialog
        onClose={handleCloseCloneModal}
        aria-labelledby="project-cloning-dialog"
        open={openCloneModal}
      >
        {cloneStep === 0 &&
          <div>
            <DialogTitle id="project-cloning-dialog" onClose={handleCloseCloneModal}>
              Clone Project - Step 1
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" gutterBottom>Enter a few details for the new project to be cloned &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Project Name"
                defaultValue={values.project_name.slice(-5) === "Clone" ? values.project_name : values.project_name + " Clone"}
                size="small"
                autoComplete="Project Name"
                autoFocus
                onChange={handleChange("project_name")}
                onFocus={handleChange("project_name")}
                />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Output File Name"
                defaultValue={values.output_file_name}
                size="small"
                autoComplete="Output File Name"
                onChange={handleChange("output_file_name")}
                />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Project Description"
                defaultValue={values.project_description}
                size="small"
                autoComplete="Project Description"
                onChange={handleChange("project_description")}
                />
            </DialogContent>
            <DialogActions style={{ justifyContent: 'center' }}>
              <Button variant="contained" onClick={() => setCloneStep(1)} color="primary">
                Proceed to Step 2
              </Button>
            </DialogActions>
          </div>
        }
        {cloneStep === 1 &&
          <div>
            <DialogTitle id="project-cloning-dialog" onClose={handleCloseCloneModal}>
              Clone Project - Step 2
            </DialogTitle>
            <DialogContent dividers>
              <Typography variant="body1" gutterBottom>Select the required items to be cloned into the new project &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
              <FormControl component="fieldset" className={classes.cloneFormControl}>
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={modelLayers} color="primary" onChange={handleCloneChange} name="modelLayers" />}
                    label="Model Layers"
                    />
                  <FormControlLabel
                    control={<Checkbox checked={preprocessingParameters} color="primary" onChange={handleCloneChange} name="preprocessingParameters" />}
                    label="Preprocessing Parameters"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={hyperParameters} color="primary" onChange={handleCloneChange} name="hyperParameters" />}
                    label="Hyperparameters"
                  />
                </FormGroup>
              </FormControl>
            </DialogContent>
            <DialogActions style={{ justifyContent: 'space-evenly' }}>
              <Button variant="contained" onClick={() => setCloneStep(0)} color="secondary">
                Previous Step
              </Button>
              {(modelLayers || preprocessingParameters || hyperParameters) &&
                <Button variant="contained" onClick={handleSaveClone} color="primary">
                  Create Clone
                </Button>
              }
            </DialogActions>
          </div>
        }
      </Dialog>

      {/* Create and Edit Projects */}
      
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              defaultValue={values.project_description}
              label="Project Description"
              size="small"
              autoComplete="Project Description"
              onChange={handleChange("project_description")}
            />
          ) : (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Project Description"
              size="small"
              autoComplete="Project Description"
              onChange={handleChange("project_description")}
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
                <MenuItem value={"python"}>Python</MenuItem>
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
                <MenuItem value={"python"}>Python</MenuItem>
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
                {/* <MenuItem value={"Pytorch"}>Pytorch</MenuItem> */}
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
          <ProjectTable
            projects={AllProjects}
            editproject={editproject}
            parent_call_on_delete={parent_call_on_delete}
            handlestep={handlestep}
            create_new_project={create_new_project}
            cloneProject={cloneProject}
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
