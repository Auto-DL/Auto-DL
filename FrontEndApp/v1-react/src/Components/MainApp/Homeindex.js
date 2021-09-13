import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Grid, CircularProgress, Backdrop, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import { AlertTitle } from '@material-ui/lab';
import HomeService from "./HomeService";
import ProjectTable from "./projects/ProjectTable";
import UpsertProjectModal from "./projects/UpsertProjectModal";
import { handleCloseModalSave } from "./operations/UpsertProject";
import CloneProjectModal from "./projects/CloneProjectModal";
import DeployProjectModal from "../Deployment/DeployProjectModal";
import { handleSaveClone } from "./operations/CloneProject";
import { handleDeleteYes } from "./operations/DeleteProject";

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
  const classes = useStyles();

  var token = JSON.parse(localStorage.getItem("token"));
  var username = JSON.parse(localStorage.getItem("username"));

  const [values, setValues] = useState({
    project_name: "",
    project_description: "",
    data_dir: "",
    language: "python",
    task: "Classification",
    library: "Keras",
    output_file_name: "",
  });

  const [AllProjects, setAllProjects] = useState([]);
  const [SelectedProject, setSelectedProject] = useState({});
  const [IsEdit, setIsEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [cloneStep, setCloneStep] = useState(0);
  const [openCloneModal, setOpenCloneModal] = useState(false);
  const [openDeployModal, setOpenDeployModal] = useState(false);

  const [cloneOptions, setCloneOptions] = useState({
    modelLayers: false,
    preprocessingParameters: false,
    hyperParameters: false,
  });

  const [deployOptions, setDeployOptions] = useState({
    localDeploy: false,
    awsDeploy: false,
    gcpDeploy: false,
  });

  const {
    modelLayers,
    preprocessingParameters,
    hyperParameters,
  } = cloneOptions;

  const {
    localDeploy,
    awsDeploy,
    gcpDeploy,
  } = deployOptions;

  const handleCloneChange = (event) => {
    setCloneOptions({
      ...cloneOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleDeployChange = (event) => {
    setDeployOptions({
      ...deployOptions,
      [event.target.name]: event.target.checked,
    });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [open, setOpen] = useState(false);

  const [alert, setalert] = useState({
    msg: "This is alert msg",
    severity: "warning",
    title: "",
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

  const [open_backdrop, setOpen_backdrop] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = {
        username: username,
      };

      setOpen_backdrop(true);
      const res = await HomeService.get_all(token, data);

      if (res.status === 200) {
        setOpen_backdrop(false);
        setAllProjects([...res.data.projects]);
      } else {
        localStorage.clear();
        history.push("/login");
      }
    }

    fetchData();
  }, [openModal, openCloneModal, openDeployModal, history, token, username]);

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
      modelLayers: false,
    });
  };

  const deployProject = (proj) => {
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
    setOpenDeployModal(true);
  };

  const shareProject = async (username, project_id, share_with) => {
    const data = { username, project_id, share_with };
    const res = await HomeService.share_project(token, data);

    if (res.status === 200) {
      setalert({ ...values, msg: res.data.message, severity: "success" });
    } else {
      setalert({ ...values, msg: res.data.message, severity: "error" });
    }
    setOpen(true);
  };

  return (
    <>
      <Backdrop
        className={classes.backdrop}
        open={open_backdrop}
        onClick={() => setOpen_backdrop(false)}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      {/* Clone Existing Projects */}

      <CloneProjectModal
        handleCloseCloneModal={handleCloseCloneModal}
        handleSaveClone={handleSaveClone}
        openCloneModal={openCloneModal}
        cloneStep={cloneStep}
        handleChange={handleChange}
        values={values}
        classes={classes}
        modelLayers={modelLayers}
        handleCloneChange={handleCloneChange}
        preprocessingParameters={preprocessingParameters}
        hyperParameters={hyperParameters}
        setCloneStep={setCloneStep}
        SelectedProject={SelectedProject}
        cloneOptions={cloneOptions}
        setOpen={setOpen}
        setOpenCloneModal={setOpenCloneModal}
        setalert={setalert}
        username={username}
        token={token}
      />

      {/* Deploy Trained Projects */}

      <DeployProjectModal
        openDeployModal={openDeployModal}
        setOpenDeployModal={setOpenDeployModal}
        deployOptions={deployOptions}
        setDeployOptions={setDeployOptions}
        localDeploy={localDeploy}
        awsDeploy={awsDeploy}
        gcpDeploy={gcpDeploy}
        values={values}
        classes={classes}
        handleDeployChange={handleDeployChange}
        values={values}
        SelectedProject={SelectedProject}
        setOpen={setOpen}
        setalert={setalert}
        username={username}
        token={token}
      />

      {/* Create and Edit Projects */}

      <UpsertProjectModal
        handleCloseModal={handleCloseModal}
        handleCloseModalSave={handleCloseModalSave}
        openModal={openModal}
        IsEdit={IsEdit}
        values={values}
        handleChange={handleChange}
        classes={classes}
        setalert={setalert}
        SelectedProject={SelectedProject}
        setOpen={setOpen}
        setOpenModal={setOpenModal}
        username={username}
        token={token}
      />

      <Grid container>
        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

        <Grid item lg={10} md={10} sm={10} xs={10}>
          <ProjectTable
            projects={AllProjects}
            editproject={editproject}
            parent_call_on_delete={parent_call_on_delete}
            handleDeleteYes={handleDeleteYes}
            handlestep={handlestep}
            create_new_project={create_new_project}
            shareProject={shareProject}
            cloneProject={cloneProject}
            deployProject={deployProject}
          />
        </Grid>

        <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
      </Grid>
      <Snackbar open={open} autoHideDuration={8000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.title !== "" && (<AlertTitle>{alert.title}</AlertTitle>)}
          {alert.msg}
        </Alert>
      </Snackbar>
      <br />
    </>
  );
}

export default Home;
