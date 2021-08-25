import { useState } from "react";
import { Button, TextField, FormControlLabel, FormGroup, FormControl, Dialog, Typography } from "@material-ui/core";
import { DialogActions, DialogTitle, DialogContent, StyledCheckbox, useStyles } from "./styles";
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudDoneIcon from '@material-ui/icons/CloudDone';
import DeploymentService from "./DeploymentService";
import { LocalDeployStepThree } from "./modals/LocalDeployment";
import { CloudDeployStepThree } from "./modals/CloudDeployment";

const DeployProjectStepOne = ({ handleCloseDeployModal, handleDeployChange, localDeploy, awsDeploy, gcpDeploy, setDeployStep, classes }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Deployment Platform
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom style={{ marginRight: "30px" }}>
                    Step 1: Select an appropriate platform to deploy the project.
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
            {(localDeploy || awsDeploy || gcpDeploy) && (
                <DialogActions style={{ justifyContent: "space-evenly" }}>
                    <Button
                        variant="contained"
                        onClick={() => setDeployStep(1)}
                        color="primary"
                    >
                        Proceed to Step 2
                    </Button>
                </DialogActions>
            )}
        </div>
    );
};

const DeployProjectStepTwo = ({ handleCloseDeployModal, setDeployStep, values, classes, setModelDeployCategories, modelDeployCategories }) => {
    const handleCategoryPicker = async () => {
        const dirHandle = await window.showDirectoryPicker();
        const newDirHandle = await dirHandle.getDirectoryHandle("train", { create: false });
        for await (const entry of newDirHandle.values()) {
            if (entry.kind === "directory") {
                // console.log(entry.kind, entry.name);
                setModelDeployCategories(category => [...category, entry.name]);
            } else {
                console.log("Select Correct Data Directory");
            }
        }
    }

    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Choose Data Directory
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Step 2: Select the appropriate data directory for the project deployment.
                </Typography>
                <TextField
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    defaultValue={"Project Name: " + values.project_name}
                    gutterBottom
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    disabled
                    fullWidth
                    defaultValue={"Task: " + values.task}
                    gutterBottom
                />
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component="span"
                    gutterBottom
                    disableElevation
                    onClick={handleCategoryPicker}
                    className={classes.dataDirUploadBtn}
                >
                    Choose Directory
                </Button>
                <Typography variant="body2" className={classes.categories}>
                    You have the following categories: <b><i>{
                        modelDeployCategories.map((category, index) => (
                            <span key={index} style={{}}>
                                <br /> {category}
                            </span>
                        ))
                    }</i></b>
                </Typography>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    onClick={() => setDeployStep(0)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {modelDeployCategories.length != 0 && (
                    <Button
                        variant="contained"
                        onClick={() => setDeployStep(2)}
                        color="primary"
                    >
                        Proceed to Step 3
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};

const DeployProjectModal = ({ setOpenDeployModal, deployOptions, setDeployOptions, localDeploy, awsDeploy, gcpDeploy, handleDeployChange,  openDeployModal, values, SelectedProject, setalert, username, token, setOpen }) => {
    const classes = useStyles();

    const [deployStep, setDeployStep] = useState(0);
    const [modelDeployCategories, setModelDeployCategories] = useState([]);
    const [localDeployVariant, setLocalDeployVariant] = useState("executable");

    // States to handle Pickle File for CLoud Deployments
    const [currentPklFile, setCurrentPklFile] = useState("");
    const [pklFileName, setPklFileName] = useState("");
    const [numberOfChunks, setNumberOfChunks] = useState(0);
    const [pklChunkSize, setPklChunkSize] = useState(50);
    // Specify constant pklChunkSize = 10MB
    // const pklChunkSize = 1048576 * 10;
    let pklChunks = [];

    const handleCloseDeployModal = () => {
        setDeployStep(0);
        setModelDeployCategories([]);
        setLocalDeployVariant("executable");
        setCurrentPklFile("");
        setPklFileName("");
        setNumberOfChunks(0);
        pklChunks = [];
        setDeployOptions({
            localDeploy: false,
            awsDeploy: false,
            gcpDeploy: false,
        });
        setOpenDeployModal(false);
    };

    const handleLocalDeployment = async () => {
        const data = {
            username: username,
            project_id: SelectedProject.project_id,
            deployment_variant: localDeployVariant,
            model_categories: modelDeployCategories,
        }

        const res = await DeploymentService.local_deploy(token, data);

        if (res.status === 200) {
            setalert({ ...values, msg: res.data.message, severity: "success" });
        } else {
            setalert({ ...values, msg: res.data.message, severity: "error" });
        }

        handleCloseDeployModal();
        setOpen(true);
    }

    const handleCloudDeployment = async () => {
        let ctr = 0;
        let i = 1;

        while (i <= numberOfChunks) {
            let currentChunk = currentPklFile.slice(ctr, ctr + pklChunkSize);
            pklChunks.push(currentChunk);
            ctr += pklChunkSize;
            i++;
        }

        // Working code

        // const data = {
        //     username: username,
        //     project_id: SelectedProject.project_id,
        //     deployment_options: deployOptions,
        //     pkl_file_content: currentPklFile,
        //     // current_chunk: i + 1,
        //     // total_chunks: numberOfChunks,
        //     model_categories: modelDeployCategories,
        // }

        // console.log(data.pkl_file_content);

        // const res = await DeploymentService.cloud_deploy(token, data);

        // Working Chunk Code

        let res = {};

        for (let i = 0; i < numberOfChunks; i++) {
            const data = {
                username: username,
                project_id: SelectedProject.project_id,
                pkl_file_bytes: pklChunks[i],
                current_chunk: i + 1,
                total_chunks: numberOfChunks,
                model_categories: modelDeployCategories,
            }

            res = await DeploymentService.cloud_deploy(token, data);
        };

        if (res.status === 200) {
            setalert({ ...values, msg: res.data.message, severity: "success" });
        } else if (res.status === 204) {
            console.log("Underway?!");
        } else {
            setalert({ ...values, msg: res.data.message, severity: "error" });
        }

        handleCloseDeployModal();
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
                    classes={classes}
                    handleCloseDeployModal={handleCloseDeployModal}
                    localDeploy={localDeploy}
                    awsDeploy={awsDeploy}
                    gcpDeploy={gcpDeploy}
                    handleDeployChange={handleDeployChange}
                    setDeployStep={setDeployStep}
                />
            )}
            {deployStep === 1 && (
                <DeployProjectStepTwo
                    values={values}
                    classes={classes}
                    handleCloseDeployModal={handleCloseDeployModal}
                    setModelDeployCategories={setModelDeployCategories}
                    modelDeployCategories={modelDeployCategories}
                    setDeployStep={setDeployStep}
                />
            )}
            {(deployStep === 2 && localDeploy) && (
                <LocalDeployStepThree
                    handleCloseDeployModal={handleCloseDeployModal}
                    setDeployStep={setDeployStep}
                    classes={classes}
                    localDeployVariant={localDeployVariant}
                    setLocalDeployVariant={setLocalDeployVariant}
                    handleLocalDeployment={handleLocalDeployment}
                />
            )}
            {((awsDeploy && deployStep === 2) || (gcpDeploy && deployStep === 2)) && (
                <CloudDeployStepThree
                    handleCloseDeployModal={handleCloseDeployModal}
                    setDeployStep={setDeployStep}
                    values={values}
                    classes={classes}
                    pklFileName={pklFileName}
                    currentPklFile={currentPklFile}
                    setPklFileName={setPklFileName}
                    setNumberOfChunks={setNumberOfChunks}
                    setCurrentPklFile={setCurrentPklFile}
                    pklChunkSize={pklChunkSize}
                    handleCloudDeployment={handleCloudDeployment}
                />
            )}
        </Dialog>
    );
}

export default DeployProjectModal;
