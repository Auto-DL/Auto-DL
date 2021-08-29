import { Button, TextField, FormControlLabel, FormGroup, Checkbox, FormControl, Dialog, Typography } from "@material-ui/core";
import { DialogActions, DialogTitle, DialogContent } from "./styles";

export const CloneProjectStepOne = ({ handleCloseCloneModal, handleChange, setCloneStep, values }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseCloneModal}
            >
                Clone Project - Step 1
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Enter a few details for the new project to be cloned
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Project Name"
                    defaultValue={
                        values.project_name.slice(-5) === "Clone"
                            ? values.project_name
                            : values.project_name + " Clone"
                    }
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
            <DialogActions style={{ justifyContent: "center" }}>
                <Button
                    variant="contained"
                    onClick={() => setCloneStep(1)}
                    color="primary"
                >
                    Proceed to Step 2
                </Button>
            </DialogActions>
        </div>
    );
};

export const CloneProjectStepTwo = ({ handleCloseCloneModal, handleSaveClone, classes, modelLayers, handleCloneChange, preprocessingParameters, hyperParameters, setCloneStep, values, cloneOptions, setOpen, setOpenCloneModal, SelectedProject, setalert, username, token }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseCloneModal}
            >
                Clone Project - Step 2
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Select the required items to be cloned into the new project
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Typography>
                <FormControl
                    component="fieldset"
                    className={classes.cloneFormControl}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={modelLayers}
                                    color="primary"
                                    onChange={handleCloneChange}
                                    name="modelLayers"
                                />
                            }
                            label="Model Layers"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={preprocessingParameters}
                                    color="primary"
                                    onChange={handleCloneChange}
                                    name="preprocessingParameters"
                                />
                            }
                            label="Preprocessing Parameters"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={hyperParameters}
                                    color="primary"
                                    onChange={handleCloneChange}
                                    name="hyperParameters"
                                />
                            }
                            label="Hyperparameters"
                        />
                    </FormGroup>
                </FormControl>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    onClick={() => setCloneStep(0)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {(modelLayers || preprocessingParameters || hyperParameters) && (
                    <Button
                        variant="contained"
                        onClick={() => handleSaveClone(values, SelectedProject, cloneOptions, setCloneStep, setOpenCloneModal, setOpen, setalert, username, token)}
                        color="primary"
                    >
                        Create Clone
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};

const CloneProjectModal = ({ handleCloseCloneModal, handleSaveClone, openCloneModal, cloneStep, handleChange, setCloneStep, values, classes, modelLayers, handleCloneChange, preprocessingParameters, hyperParameters, setalert, username, token, SelectedProject, cloneOptions, setOpen, setOpenCloneModal }) => {
    return (
        <Dialog
            onClose={handleCloseCloneModal}
            aria-labelledby="project-cloning-dialog"
            open={openCloneModal}
        >
            {cloneStep === 0 && (
                <CloneProjectStepOne
                    handleCloseCloneModal={handleCloseCloneModal}
                    handleChange={handleChange}
                    setCloneStep={setCloneStep}
                    values={values}
                />
            )}
            {cloneStep === 1 && (
                <CloneProjectStepTwo
                    handleCloseCloneModal={handleCloseCloneModal}
                    handleSaveClone={handleSaveClone}
                    classes={classes}
                    modelLayers={modelLayers}
                    handleCloneChange={handleCloneChange}
                    preprocessingParameters={preprocessingParameters}
                    hyperParameters={hyperParameters}
                    setCloneStep={setCloneStep}
                    values={values}
                    SelectedProject={SelectedProject}
                    cloneOptions={cloneOptions}
                    setOpen={setOpen}
                    setOpenCloneModal={setOpenCloneModal}
                    setalert={setalert}
                    username={username}
                    token={token}
                />
            )}
        </Dialog>
    );
}

export default CloneProjectModal;
