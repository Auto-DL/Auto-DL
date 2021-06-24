import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import HomeService from "./HomeService";
import Typography from "@material-ui/core/Typography";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  title: {},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

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
  const [open, setOpen] = React.useState(false);
  const [current_project, setcurrent_project] = React.useState("");
  var username = JSON.parse(localStorage.getItem("username"));
  var token = JSON.parse(localStorage.getItem("token"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteYes = async () => {
    setOpen(false);
    const data = {
      username: username,
      project_id: current_project.project_id,
      project_name: current_project.project_name,
    };
    const res = await HomeService.delete_project(token, data);
    console.log(res);
    props.parent_call_on_delete();
    // window.location.reload();
  };

  const handleEdit = (project) => {
    console.log(project.project_id);
    props.editproject(project);
  };

  const handleDelete = (project) => {
    console.log(project.project_id);
    setcurrent_project(project);
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
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="center">Language</StyledTableCell>
                  <StyledTableCell align="center">Library</StyledTableCell>
                  <StyledTableCell align="center">
                    Data Directory
                  </StyledTableCell>
                  <StyledTableCell align="center">Task</StyledTableCell>
                  <StyledTableCell align="center">
                    Output File Name
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.projects.map((project) => (
                  <>
                    {Object.keys(project).map((p, index) => (
                      <>
                        <StyledTableRow key={project[p].project_id}>
                          <StyledTableCell component="th" scope="row">
                            {project[p].project_name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project[p].lang}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project[p].lib}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project[p].data_dir}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project[p].task}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {project[p].output_file_name}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className={classes.hover}
                            onClick={() => handleEdit(project[p])}
                          >
                            <EditIcon />
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className={classes.hover}
                            onClick={() => handleDelete(project[p])}
                          >
                            <DeleteIcon />
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            className={classes.hover}
                            onClick={() => props.handlestep(project[p])}
                          >
                            <ArrowForwardIcon />
                          </StyledTableCell>
                        </StyledTableRow>
                      </>
                    ))}
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
