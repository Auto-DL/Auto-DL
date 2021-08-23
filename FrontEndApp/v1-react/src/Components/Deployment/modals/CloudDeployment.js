import { TextField, Typography, Button } from '@material-ui/core';
import { DialogActions, DialogTitle, DialogContent } from "../styles";

export const CloudDeployStepThree = ({ handleCloseDeployModal, setDeployStep, values, classes, pklFileName, setNumberOfChunks, setPklFileName, currentPklFile, setCurrentPklFile, pklChunkSize, handleCloudDeployment }) => {
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
        const pklFile = await pklHandle[0].getFile();
        setPklFileName(pklHandle[0].name);
        setNumberOfChunks(Math.ceil(pklFile.size / pklChunkSize));

        const contents = await pklFile.text();
        // GET BYTES
        const contentBytes = await pklFile.arrayBuffer();
        console.log(contentBytes);
        setCurrentPklFile(contents);
    }

    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Upload Pickle File
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom>
                    Step 3: Upload the <i>.pkl</i>&nbsp; file required to initiate deployment.
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
                    defaultValue={"Description: " + values.project_description}
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
            <DialogActions style={{ justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    onClick={() => setDeployStep(1)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {currentPklFile && (
                    <Button
                        variant="contained"
                        onClick={handleCloudDeployment}
                        color="primary"
                    >
                        Initiate Deployment
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};
