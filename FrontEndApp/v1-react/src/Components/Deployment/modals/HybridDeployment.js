import { Radio, RadioGroup, FormControl, FormControlLabel, Typography, Button } from '@material-ui/core';
import { DialogActions, DialogTitle, DialogContent } from "../styles";

export const HybridDeployStepThree = ({ handleCloseDeployModal, setDeployStep, values, classes, pklFileName, setNumberOfChunks, setPklFileName, currentPklFile, setCurrentPklFile, pklChunkSize, handleHybridDeployment, localDeployVariant, setLocalDeployVariant }) => {
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

        const contents = await pklFile.arrayBuffer();
        const contentBytes = new Uint8Array(contents);

        setCurrentPklFile(contentBytes);
        setNumberOfChunks(Math.ceil(contentBytes.length / pklChunkSize));
    }

    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Hybrid Deployment: Preferences
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom style={{ marginRight: "30px" }}>
                    Step 3.1: Select the most suitable option as per local deployment needs.
                </Typography>
                <FormControl component="fieldset" style={{ marginBottom: "20px" }}>
                    <RadioGroup aria-label="gender" name="localDeployVariant" value={localDeployVariant} onChange={(e) => setLocalDeployVariant(e.target.value)}>
                        <FormControlLabel value="executable" disabled control={<Radio />} label="Download an Executable" />
                        <FormControlLabel value="zip" control={<Radio />} label="Download a Zipped Folder" />
                    </RadioGroup>
                </FormControl>
                <Typography variant="body1" gutterBottom>
                    Step 3.2: Upload the <i>.pkl</i>&nbsp; file required to initiate cloud deployment.
                </Typography>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    component="span"
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
                        onClick={handleHybridDeployment}
                        color="primary"
                        data-testid="hybrid-deploy-btn"
                    >
                        Initiate Deployment
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};
