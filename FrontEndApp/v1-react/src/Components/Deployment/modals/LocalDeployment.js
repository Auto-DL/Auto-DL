import { Radio, RadioGroup, FormControl, FormGroup, FormControlLabel, Typography, Button, Checkbox } from '@material-ui/core';
import { DialogActions, DialogTitle, DialogContent } from "../styles";

export const LocalDeployStepThree = ({ handleCloseDeployModal, setDeployStep, classes, localDeployVariant, setLocalDeployVariant, handleLocalDeployment, handleDeployChange }) => {
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
                        <FormControlLabel value="executable" control={<Radio />} label="Download an Executable" />
                        <FormControlLabel value="zip" control={<Radio />} label="Download a Zipped Folder" />
                    </RadioGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    name="windows"
                                    onChange={handleDeployChange}
                                />
                            }
                            label="Windows"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="secondary"
                                    name="linux"
                                    onChange={handleDeployChange}
                                />
                            }
                            label="Linux"
                        />
                    </FormGroup>
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
