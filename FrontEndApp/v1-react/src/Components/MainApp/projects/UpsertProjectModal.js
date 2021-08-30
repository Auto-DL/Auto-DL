import { Select, MenuItem, Button, TextField, InputLabel, FormControl, Dialog } from "@material-ui/core";
import { DialogActions, DialogTitle, DialogContent } from "./styles";

const UpsertProjectModal = ({ handleCloseModal, handleCloseModalSave, openModal, IsEdit, values, handleChange, classes, setalert, setOpen, setOpenModal, SelectedProject, username, token }) => {
    return (
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
              data-testid="edit-project-input-name"
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
              data-testid="create-project-input-name"
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
              data-testid="edit-project-input-desc"
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
              data-testid="create-project-input-desc"
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
              data-testid="edit-project-input-datadir"
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
              data-testid="create-project-input-datadir"
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
              data-testid="edit-project-input-opfile"
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
              data-testid="create-project-input-opfile"
              onChange={handleChange("output_file_name")}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => handleCloseModalSave(values, IsEdit, setalert, setOpen, setOpenModal, SelectedProject, username, token)}
            color="primary"
          >
            Save Changes
          </Button>
        </DialogActions>

      </Dialog>
    );
}

export default UpsertProjectModal;
