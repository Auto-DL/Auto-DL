import React, { useState, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogTitle, DialogContent, Button, IconButton, Menu, TextField, MenuItem, Box, Grid, Popover } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Icon from "@material-ui/core/Icon";
import SvgIcon from "@material-ui/core/SvgIcon";
import HomeService from "../HomeService";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
  title: {
    float: "left",
    fontSize: "24px",
    fontWeight: "700",
  },
  hover: {
    cursor: "pointer",
  },
  floatright: {
    float: "right",
    cursor: "pointer",
    padding: "3px",
  },
  typo: {
    paddingBottom: "10px",
  },
});

export default function Project_table(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElShared, setAnchorElShared] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [currentProject, setCurrentProject] = useState({});
  const [usernameToShareWith, setUsernameToShareWith] = useState("");
  const [currentSharedUsers, setCurrentSharedUsers] = useState([]);
  const [anchorElPop, setAnchorElPop] = React.useState(null);

  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  const handleClose = () => {
    setOpen(false);
    setOpenShare(false);
  };

  const handleActionsOpen = (project, event) => {
    setAnchorEl(event.currentTarget);
    setCurrentProject(project);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleActionsClose();
    handleShareActionsClose();
    props.editproject(currentProject);
  };

  const handleClone = () => {
    // console.log(currentProject.project_id);
    handleActionsClose();
    props.cloneProject(currentProject);
  };

  const handleDeploy = () => {
    // console.log(currentProject.project_id);
    handleActionsClose();
    props.deployProject(currentProject);
  };

  const handleDelete = () => {
    // console.log("current proj is", currentProject);
    handleActionsClose();
    handleShareActionsClose();
    setCurrentProject(currentProject);
    setOpen(true);
  };

  //share handlers
  const handleShareActionsOpen = (project, event) => {
    setAnchorElShared(event.currentTarget);
    setCurrentProject(project);
  };

  const handleShareActionsClose = () => {
    setAnchorElShared(null);
  };

  const handleShare = async () => {
    const res = await HomeService.get_all_users(token);
    if (res.data.users) {
      setAllUsers(
        res.data.users.filter(
          (user) => user !== username && user !== currentProject.username
        )
      );
    }
    handleShareActionsClose();
    setOpenShare(true);
    handleActionsClose();
    setCurrentProject(currentProject);
  };

  const handleShareUsernameChange = (event, value) => {
    setUsernameToShareWith(value);
  };

  const handleShareClick = () => {
    if (allUsers.includes(usernameToShareWith)) {
      props.shareProject(
        username,
        currentProject.project_id,
        usernameToShareWith
      );
      if (
        currentProject.shared_with &&
        !currentProject.shared_with.includes(usernameToShareWith)
      ) {
        currentProject.shared_with.push(usernameToShareWith);
      }
    }
  };

  const handleClickPop = (event) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };

  const openPop = Boolean(anchorElPop);
  const id = openPop ? "simple-popover" : undefined;

  const parentCallOnDelete = () => props.parent_call_on_delete();
  const setCloseDeleteModal = () => setOpen(false);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to Delete?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => props.handleDeleteYes(setCloseDeleteModal, currentProject, username, token, parentCallOnDelete)}
            color="secondary"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openShare} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Share Project ({currentProject ? currentProject.project_name : ""})
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body1" gutterBottom>
            Enter the username of the user to share the project with:
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Typography>
          <Box my={2}>
            <Autocomplete
              id="combo-box-demo"
              options={allUsers}
              getOptionLabel={(option) => option}
              style={{ width: 250 }}
              onInputChange={handleShareUsernameChange}
              renderInput={(params) => (
                <TextField {...params} label="Username" variant="outlined" />
              )}
            />
          </Box>
          <Box my={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleShareClick}
            >
              Share
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorElPop}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box p={2} justify="center">
          <Typography style={{ fontWeight: 600 }}> Sharing With:</Typography>

          {currentSharedUsers.map((user) => (
            <Typography>{user}</Typography>
          ))}
        </Box>
      </Popover>

      {props.projects.length === 0 ? (
        <>
          <div>
            <div className={classes.title}>No projects to show</div>
            <Typography className={classes.floatright} component="div">
              <div onClick={props.create_new_project}>
                <AddCircleIcon fontSize={"large"} />
              </div>
            </Typography>
          </div>
        </>
      ) : (
        <>
          {props.projects.filter(
            (project) => !Object.keys(project)[0].startsWith("shared_")
          ).length > 0 ? (
            <>
              <div>
                <Typography
                  className={classes.title}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                >
                  Projects &#40;{props.projects ? props.projects.length : 0}&#41;
                </Typography>
                <Typography component={"span"} className={classes.floatright}>
                  <div onClick={props.create_new_project}>
                    <AddCircleIcon fontSize={"large"} />
                  </div>
                </Typography>
              </div>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        width="2%"
                        align="center"
                      ></StyledTableCell>
                      <StyledTableCell width="10%" align="center">
                        Name
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Language
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Library
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Data Directory
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Task
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Output File Name
                      </StyledTableCell>
                      <StyledTableCell width="16%" align="center">
                        Project Description
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Actions
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.projects
                      .filter(
                        (project) =>
                          !Object.keys(project)[0].startsWith("shared_")
                      )
                      .map((project, index) => (
                        <Fragment key={index}>
                          {Object.keys(project).map((p) => (
                            <TableRow
                              hover
                              className={classes.hover}
                              key={project[p].project_id}
                            >
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                <Grid
                                  container
                                  direction="row"
                                  alignItems="center"
                                  justifyContent="center"
                                  onClick={() => props.handlestep(project[p])}
                                >
                                  {project[p].shared_with &&
                                  project[p].shared_with.length > 0 ? (
                                    <IconButton
                                      onMouseEnter={() =>
                                        setCurrentSharedUsers(
                                          project[p].shared_with
                                        )
                                      }
                                      onMouseOver={handleClickPop}
                                      style={{ backgroundColor: "transparent" }}
                                      disableFocusRipple={true}
                                      disableRipple={true}
                                    >
                                      <PeopleAltIcon />
                                    </IconButton>
                                  ) : (
                                    ""
                                  )}
                                </Grid>
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                                data-testid={`project-name-${index}`}
                              >
                                <> {project[p].project_name}</>
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-lang-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].lang}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-lib-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].lib}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-datadir-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].data_dir}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-task-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].task}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-output-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].output_file_name}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                data-testid={`project-description-${index}`}
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].project_description.length <= 40
                                  ? project[p].project_description
                                  : project[p].project_description.slice(
                                      0,
                                      40
                                    ) + "..."}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton
                                  aria-controls="customized-menu"
                                  aria-label="options"
                                  aria-haspopup="true"
                                  data-testid={`project-actions-btn-${index}`}
                                  onClick={(e) =>
                                    handleActionsOpen(project[p], e)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="customized-menu"
                                  anchorEl={anchorEl}
                                  elevation={1}
                                  keepMounted
                                  open={Boolean(anchorEl)}
                                  onClose={handleActionsClose}
                                >
                                  <MenuItem onClick={handleEdit}>
                                    <EditIcon /> &nbsp; Edit
                                  </MenuItem>
                                  <MenuItem onClick={handleClone}>
                                    <FileCopyIcon /> &nbsp; Clone
                                  </MenuItem>
                                  <MenuItem onClick={handleDelete} data-testid={`delete-project-btn-${index}`}>
                                    <DeleteIcon /> &nbsp; Delete
                                  </MenuItem>
                                  <MenuItem onClick={handleShare}>
                                    <ShareIcon /> &nbsp; Share
                                  </MenuItem>
                                  <MenuItem onClick={handleDeploy}>
                                    <Icon aria-label="deploy">
                                      <SvgIcon viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M20 22L16.14 20.45C16.84 18.92 17.34 17.34 17.65 15.73L20 22M7.86 20.45L4 22L6.35 15.73C6.66 17.34 7.16 18.92 7.86 20.45M12 2C12 2 17 4 17 12C17 15.1 16.25 17.75 15.33 19.83C15 20.55 14.29 21 13.5 21H10.5C9.71 21 9 20.55 8.67 19.83C7.76 17.75 7 15.1 7 12C7 4 12 2 12 2M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12Z" />
                                      </SvgIcon>
                                    </Icon> &nbsp; Deploy
                                  </MenuItem>
                                </Menu>
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </Fragment>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>{" "}
            </>
          ) : (
            <>
              <div>
                <div className={classes.title}>
                  No personal projects to show
                </div>
                <Typography className={classes.floatright}>
                  <div onClick={props.create_new_project}>
                    <AddCircleIcon fontSize={"large"} />
                  </div>
                </Typography>
              </div>
            </>
          )}

          {/* SHARED PROJECTS SECTION */}

          {props.projects.filter((project) =>
            Object.keys(project)[0].startsWith("shared_")
          ).length > 0 ? (
            <>
              <div style={{ marginTop: "80px" }}>
                <Typography
                  className={classes.title}
                  variant="h6"
                  id="tableTitle"
                  component="div"
                  style={{ marginBottom: "8px" }}
                >
                  Shared with me
                </Typography>
              </div>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        width="4%"
                        align="center"
                      ></StyledTableCell>
                      <StyledTableCell width="10%" align="center">
                        Name
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Language
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Library
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Data Directory
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Task
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Output File Name
                      </StyledTableCell>
                      <StyledTableCell width="16%" align="center">
                        Project Description
                      </StyledTableCell>
                      <StyledTableCell width="12%" align="center">
                        Actions
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.projects
                      .filter((project) =>
                        Object.keys(project)[0].startsWith("shared_")
                      )
                      .map((project, index) => (
                        <Fragment key={index}>
                          {Object.keys(project).map((p) => (
                            <TableRow
                              hover
                              className={classes.hover}
                              key={project[p].project_id}
                            >
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              ></StyledTableCell>
                              <StyledTableCell
                                align="center"
                                component="th"
                                scope="row"
                              >
                                {project[p].project_name}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].lang}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].lib}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].data_dir}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].task}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].output_file_name}
                              </StyledTableCell>
                              <StyledTableCell
                                align="center"
                                onClick={() => props.handlestep(project[p])}
                              >
                                {project[p].project_description.length <= 40
                                  ? project[p].project_description
                                  : project[p].project_description.slice(
                                      0,
                                      40
                                    ) + "..."}
                              </StyledTableCell>
                              <StyledTableCell align="center">
                                <IconButton
                                  aria-controls="customized-menu2"
                                  aria-label="options"
                                  aria-haspopup="true"
                                  onClick={(e) =>
                                    handleShareActionsOpen(project[p], e)
                                  }
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="customized-menu2"
                                  anchorEl={anchorElShared}
                                  elevation={1}
                                  keepMounted
                                  open={Boolean(anchorElShared)}
                                  onClose={handleShareActionsClose}
                                >
                                  <MenuItem onClick={handleEdit}>
                                    <EditIcon /> &nbsp; Edit
                                  </MenuItem>
                                  {/* <MenuItem onClick={handleClone}>
                                    <FileCopyIcon /> &nbsp; Clone
                                  </MenuItem> */}
                                  <MenuItem onClick={handleDelete}>
                                    <DeleteIcon /> &nbsp; Delete
                                  </MenuItem>
                                  {/* <MenuItem
                                    onClick={() => {
                                      handleShare();
                                    }}
                                  >
                                    <ShareIcon /> &nbsp; Share
                                  </MenuItem> */}
                                </Menu>
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </Fragment>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          ) : (
            ""
          )}
        </>
      )}
    </>
  );
}
