import React, { useState, useEffect, Fragment } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Button,
  IconButton,
  Menu,
  TextField,
  MenuItem,
  Box,
  Grid,
  Popover,
} from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import HomeService from "./HomeService";
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
  const [allUsers, setAllUsers] = useState([]);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openShare, setOpenShare] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentProject, setCurrentProject] = useState({});
  const [currentProject2, setCurrentProject2] = useState({});
  const [currentProjectTemp, setCurrentProjectTemp] = useState(null);
  const [usernameToShareWith, setUsernameToShareWith] = useState("");
  const [currentSharedUsers, setCurrentSharedUsers] = useState([]);
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  console.log("all are", props.projects);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenShare(false);
  };

  const handleActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    console.log(currentProject.project_id);
    handleActionsClose();
    props.editproject(currentProject);
  };

  const handleClone = () => {
    console.log(currentProject.project_id);
    handleActionsClose();
    props.cloneProject(currentProject);
  };

  const handleDelete = () => {
    console.log(currentProject.project_id);
    handleActionsClose();
    setCurrentProject(currentProject);
    setOpen(true);
  };

  //share handlers
  const handleShare = async () => {
    const res = await HomeService.get_all_users(token);
    setAllUsers(
      res.data.users.filter(
        (user) => user !== username && user != currentProjectTemp.shared_by
      )
    );
    handleActionsClose();
    setOpenShare(true);
    setCurrentProject2(currentProjectTemp);
  };

  const handleShareUsernameChange = (event, value) => {
    setUsernameToShareWith(value);
  };

  const handleShareClick = () => {
    var owner = "";
    if (currentProject2.shared_by) {
      owner = currentProject2.shared_by;
    }

    if (allUsers.includes(usernameToShareWith)) {
      props.shareProject(
        username,
        owner,
        currentProject2.project_id,
        usernameToShareWith
      );
      currentProject2.shared_with.push(usernameToShareWith);
      setUsernameToShareWith("");
    }
  };

  // pop over
  const [anchorElPop, setAnchorElPop] = React.useState(null);

  const handleClickPop = (event) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };
  const openPop = Boolean(anchorElPop);
  const id = openPop ? "simple-popover" : undefined;
  const handleDeleteYes = async () => {
    setOpen(false);
    console.log(currentProject.project_id);
    const data = {
      username: username,
      project_id: currentProject.project_id,
      project_name: currentProject.project_name,
      project_description: currentProject.project_description,
    };
    const res = await HomeService.delete_project(token, data);
    console.log(res);
    props.parent_call_on_delete();
  };

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
          <Button onClick={handleDeleteYes} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openShare} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          Share Project ({currentProject2 ? currentProject2.project_name : ""})
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
        {/* {forEach.currentSharedUsers((user) => (
          <Typography>user</Typography>
        ))} */}
        <Box p={2} justify="center">
          <Typography style={{ fontWeight: 600 }}> Sharing With:</Typography>

          {currentSharedUsers.map((user) => (
            <Typography>{user}</Typography>
          ))}
        </Box>

        {/* <Typography>
          <h1>{typeof currentSharedUsers}</h1>
        </Typography> */}
      </Popover>
      {props.projects.length === 0 ? (
        <>
          <div>
            <div className={classes.title}>No projects to show</div>
            <Typography className={classes.floatright}>
              <div onClick={props.create_new_project}>
                <AddCircleIcon fontSize={"large"} />
              </div>
            </Typography>
          </div>
        </>
      ) : (
        <>
          <div>
            <Typography
              className={classes.title}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Projects
            </Typography>
            <Typography className={classes.floatright}>
              <div onClick={props.create_new_project}>
                <AddCircleIcon fontSize={"large"} />
              </div>
            </Typography>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Language</StyledTableCell>
                  <StyledTableCell align="center">Library</StyledTableCell>
                  <StyledTableCell align="center">
                    Data Directory
                  </StyledTableCell>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">
                    Output File Name
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Project Description
                  </StyledTableCell>
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.projects
                  .filter(
                    (project) => !Object.keys(project)[0].startsWith("shared_")
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
                            component="th"
                            scope="row"
                            // onClick={() => props.handlestep(project[p])}
                            // style={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justify="center"
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
                                  <PeopleAltIcon
                                    style={{ marginRight: "10px" }}
                                  />
                                </IconButton>
                              ) : (
                                ""
                              )}

                              <> {project[p].project_name}</>
                            </Grid>
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
                              : project[p].project_description.slice(0, 40) +
                                "..."}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            onClick={() => {
                              setCurrentProject(project[p]);
                              setCurrentProjectTemp(project[p]);
                            }}
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-label="options"
                              aria-haspopup="true"
                              onClick={handleActionsOpen}
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
                              <MenuItem
                                onClick={() => handleEdit(currentProject)}
                              >
                                <EditIcon /> &nbsp; Edit
                              </MenuItem>
                              <MenuItem onClick={handleClone}>
                                <FileCopyIcon /> &nbsp; Clone
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDelete(currentProject)}
                              >
                                <DeleteIcon /> &nbsp; Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleShare();
                                }}
                              >
                                <ShareIcon /> &nbsp; Share
                              </MenuItem>
                            </Menu>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* SHARED PROJECTS SECTION */}
          <Box my={6}>
            <Typography
              className={classes.title}
              variant="h6"
              id="sharedTableTitle"
              component="div"
            >
              Shared with me
            </Typography>
          </Box>

          {/* <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableBody>
                {props.projects
                  .filter((project) =>
                    Object.keys(project)[0].startsWith("shared_")
                  )
                  .map((project, index) => (
                    <Fragment key={index}>
                      {Object.keys(project).map((p, index) => (
                        <TableRow
                          hover
                          className={classes.hover}
                          key={project[p].project_id}
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
                          {project[p].project_description.length <= 40 ? project[p].project_description : project[p].project_description.slice(0, 40)+"..."}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          onClick={() => setCurrentProject(project[p])}
                        >
                          <StyledTableCell
                            align="center"
                            component="th"
                            scope="row"
                            onClick={() => props.handlestep(project[p])}
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
                            {project[p].project_description}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            onClick={() => {
                              setCurrentProject(project[p]);
                              setCurrentProjectTemp(project[p]);
                            }}
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-label="options"
                              aria-haspopup="true"
                              onClick={handleActionsOpen}
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
                              <MenuItem
                                onClick={() => handleEdit(currentProject)}
                              >
                                <EditIcon /> &nbsp; Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDelete(currentProject)}
                              >
                                <DeleteIcon /> &nbsp; Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleShare();
                                }}
                              >
                                <ShareIcon /> &nbsp; Share
                              </MenuItem>
                            </Menu>
                          </StyledTableCell>
                        </TableRow>
                      ))}
                    </Fragment>
                  ))}
                            <MenuItem onClick={handleEdit}>
                              <EditIcon /> &nbsp; Edit
                            </MenuItem>
                            <MenuItem onClick={handleClone}>
                              <FileCopyIcon /> &nbsp; Clone
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                              <DeleteIcon /> &nbsp; Delete
                            </MenuItem>
                          </Menu>
                        </StyledTableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer> */}

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Language</StyledTableCell>
                  <StyledTableCell align="center">Library</StyledTableCell>
                  <StyledTableCell align="center">
                    Data Directory
                  </StyledTableCell>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">
                    Output File Name
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Project Description
                  </StyledTableCell>{" "}
                  <StyledTableCell align="center">Actions</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.projects
                  .filter(
                    (project) => !Object.keys(project)[0].startsWith("shared_")
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
                            component="th"
                            scope="row"
                            // onClick={() => props.handlestep(project[p])}
                            // style={{ display: "flex", alignItems: "center" }}
                          >
                            <Grid
                              container
                              direction="row"
                              alignItems="center"
                              justify="center"
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
                                  <PeopleAltIcon
                                    style={{ marginRight: "10px" }}
                                  />
                                </IconButton>
                              ) : (
                                ""
                              )}

                              {project[p].project_name}
                            </Grid>
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
                              : project[p].project_description.slice(0, 40) +
                                "..."}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            onClick={() => {
                              setCurrentProject(project[p]);
                              setCurrentProjectTemp(project[p]);
                            }}
                          >
                            <IconButton
                              aria-controls="customized-menu"
                              aria-label="options"
                              aria-haspopup="true"
                              onClick={handleActionsOpen}
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
                              <MenuItem
                                onClick={() => handleEdit(currentProject)}
                              >
                                <EditIcon /> &nbsp; Edit
                              </MenuItem>
                              <MenuItem onClick={handleClone}>
                                <FileCopyIcon /> &nbsp; Clone
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleDelete(currentProject)}
                              >
                                <DeleteIcon /> &nbsp; Delete
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleShare();
                                }}
                              >
                                <ShareIcon /> &nbsp; Share
                              </MenuItem>
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
      )}
    </>
  );
}
