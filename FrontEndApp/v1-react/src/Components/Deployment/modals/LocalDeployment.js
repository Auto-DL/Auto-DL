import { Radio, RadioGroup, FormControl, FormControlLabel, Typography, Button } from '@material-ui/core';
import { DialogActions, DialogTitle, DialogContent } from "../styles";

export const LocalDeployStepThree = ({ handleCloseDeployModal, setDeployStep, classes, localDeployVariant, setLocalDeployVariant, handleLocalDeployment }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Deployment Option
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom style={{ marginRight: "30px" }}>
                    Step 3: Select the most suitable option as per deployment needs.
                </Typography>
                <FormControl component="fieldset">
                    <RadioGroup aria-label="gender" name="localDeployVariant" value={localDeployVariant} onChange={(e) => setLocalDeployVariant(e.target.value)}>
                        <FormControlLabel value="executable" disabled control={<Radio />} label="Download an Executable" />
                        <FormControlLabel value="zip" control={<Radio />} label="Download a Zipped Folder" />
                    </RadioGroup>
                </FormControl>
            </DialogContent>
            <DialogActions style={{ justifyContent: "space-evenly" }}>
                <Button
                    variant="contained"
                    onClick={() => setDeployStep(1)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {(true) && (
                    <Button
                        variant="contained"
                        onClick={handleLocalDeployment}
                        color="primary"
                    >
                        Initiate Deployment
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};
