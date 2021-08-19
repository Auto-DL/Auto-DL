import { useState } from "react";
import { Button, TextField, FormControlLabel, FormGroup, FormControl, Dialog, Typography } from "@material-ui/core";
import { DialogActions, DialogTitle, DialogContent, StyledCheckbox, useStyles } from "./styles";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import DeploymentService from "./DeploymentService";

const DeployProjectStepOne = ({ handleCloseDeployModal, handleChange, setDeployStep, values, classes, currentPklFile, setCurrentPklFile, pklFileName, setPklFileName }) => {
    const handlePklUpload = async () => {
        const pklHandle = await window.showOpenFilePicker({
            types: [
                {
                    description: 'PKL Files',
                    accept: {
                        'text/pkl': ['.pkl'],
                    }
                },
            ]
        });
        const pklFile = await pklHandle[0].getFile()
        const contents = await pklFile.text();
        setCurrentPklFile(JSON.stringify(contents));
        setPklFileName(pklHandle[0].name);
    }

    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Deploy Project - Upload Pickle File
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Step 1: Upload the <i>.pkl</i>&nbsp; file required to initiate deployment.
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    defaultValue={"Project Name: " + values.project_name}
                    onChange={handleChange("project_name")}
                    onFocus={handleChange("project_name")}
                    gutterBottom
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    defaultValue={"Task: " + values.task}
                    onChange={handleChange("task")}
                    onFocus={handleChange("task")}
                    gutterBottom
                />
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component="span"
                    gutterBottom
                    disableElevation
                    onClick={handlePklUpload}
                    className={classes.pklUploadBtn}
                >
                    Upload File
                </Button>
                <Typography variant="body2" gutterBottom className={classes.pklFileName}>
                    You have selected: <b><i>{pklFileName}</i></b>
                </Typography>
            </DialogContent>
            {currentPklFile && <DialogActions style={{ justifyContent: "center" }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setDeployStep(1)}
                >
                    Proceed to Step 2
                </Button>
            </DialogActions>}
        </div>
    );
};

const DeployProjectStepTwo = ({ handleCloseDeployModal, handleDeployChange, localDeploy, awsDeploy, gcpDeploy, setDeployStep, classes, handleDeployment }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Deploy Project - Platform
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom style={{ marginRight: "30px" }}>
                    Step 2: Select an appropriate platform to deploy the project.
                </Typography>
                <FormControl
                    component="fieldset"
                    className={classes.cloneFormControl}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <StyledCheckbox
                                    checked={localDeploy}
                                    color="primary"
                                    name="localDeploy"
                                    icon={<LaptopMacIcon />}
                                    checkedIcon={<LaptopMacIcon />}
                                    onChange={handleDeployChange}
                                />
                            }
                            label="Deploy Locally"
                        />
                        <FormControlLabel
                            control={
                                <StyledCheckbox
                                    checked={awsDeploy}
                                    color="primary"
                                    name="awsDeploy"
                                    icon={<CloudIcon />}
                                    checkedIcon={<CloudDoneIcon />}
                                    onChange={handleDeployChange}
                                />
                            }
                            label="Deploy To AWS"
                            // disabled
                        />
                        <FormControlLabel
                            control={
                                <StyledCheckbox
                                    checked={gcpDeploy}
                                    color="primary"
                                    name="gcpDeploy"
                                    icon={<CloudIcon />}
                                    checkedIcon={<CloudDoneIcon />}
                                    onChange={handleDeployChange}
                                />
                            }
                            label="Deploy To GCP"
                            // disabled
                        />
                    </FormGroup>
                </FormControl>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    onClick={() => setDeployStep(0)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {(localDeploy || awsDeploy || gcpDeploy) && (
                    <Button
                        variant="contained"
                        onClick={handleDeployment}
                        color="primary"
                    >
                        Initiate Deployment
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};

const DeployProjectModal = ({ setOpenDeployModal, setDeployStep, setDeployOptions, handleDeployChange, localDeploy, awsDeploy, gcpDeploy,  openDeployModal, deployStep, handleChange, values, setalert, token, setOpen }) => {
    const classes = useStyles();

    const [currentPklFile, setCurrentPklFile] = useState("");
    const [pklFileName, setPklFileName] = useState("");

    const handleCloseDeployModal = () => {
        setCurrentPklFile("");
        setPklFileName("");
        setOpenDeployModal(false);
        setDeployStep(0);
        setDeployOptions({
            localDeploy: false,
            awsDeploy: false,
            gcpDeploy: false,
        });
    };

    const handleDeployment = async () => {
        handleCloseDeployModal();

        const data = {
            pklFileName: pklFileName,
            pklFileContent: currentPklFile,
        }

        const res = await DeploymentService.deploy_project(token, data);

        if (res.status === 200) {
            setalert({ ...values, msg: res.data.message, severity: "success" });
            localStorage.setItem("deployment_data", JSON.stringify(data));
        } else {
            setalert({ ...values, msg: res.data.message, severity: "error" });
        }

        setOpen(true);
    }

    return (
        <Dialog
            onClose={handleCloseDeployModal}
            aria-labelledby="project-cloning-dialog"
            open={openDeployModal}
        >
            {deployStep === 0 && (
                <DeployProjectStepOne
                    handleCloseDeployModal={handleCloseDeployModal}
                    handleChange={handleChange}
                    setDeployStep={setDeployStep}
                    values={values}
                    classes={classes}
                    currentPklFile={currentPklFile}
                    setCurrentPklFile={setCurrentPklFile}
                    pklFileName={pklFileName}
                    setPklFileName={setPklFileName}
                />
            )}
            {deployStep === 1 && (
                <DeployProjectStepTwo
                    handleCloseDeployModal={handleCloseDeployModal}
                    handleDeployChange={handleDeployChange}
                    localDeploy={localDeploy}
                    awsDeploy={awsDeploy}
                    gcpDeploy={gcpDeploy}
                    setDeployStep={setDeployStep}
                    classes={classes}
                    handleDeployment={handleDeployment}
                />
            )}
        </Dialog>
    );
}

export default DeployProjectModal;
