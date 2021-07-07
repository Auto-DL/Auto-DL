import React, { useState, Fragment } from "react";
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
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import HomeService from "./HomeService";

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

export default function ProjectTable(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteYes = async () => {
    setOpen(false);
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

  const handleActionsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleActionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = (project) => {
    console.log(project.project_id);
    handleActionsClose();
    props.editproject(project);
  };

  const handleDelete = (project) => {
    console.log(project.project_id);
    handleActionsClose();
    setCurrentProject(project);
    setOpen(true);
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

      {props.projects.length === 0 ? (
        <>
          <div>
            <div className={classes.title}>No projects to show</div>
            <Typography component={"span"} className={classes.floatright}>
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
                {props.projects.map((project, index) => (
                  <Fragment key={index}>
                    {Object.keys(project).map((p, index) => (
                      <TableRow
                        hover
                        className={classes.hover}
                        key={project[p].project_id}
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
                          {project[p].project_description.length <= 40 ? project[p].project_description : project[p].project_description.slice(0, 40)+"..."}
                        </StyledTableCell>
                        <StyledTableCell
                          align="center"
                          onClick={() => setCurrentProject(project[p])}
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
