import { Radio, RadioGroup, FormControl, FormControlLabel, Typography, Button, Checkbox, FormGroup } from '@material-ui/core';
import { DialogActions, DialogTitle, DialogContent } from "../styles";

export const LocalDeployStepThree = ({ handleCloseDeployModal, setDeployStep, localDeployVariant, setLocalDeployVariant }) => {
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
                        onClick={() => setDeployStep(3)}
                        color="primary"
                    >
                        Proceed to Step 4
                    </Button>
                )}
            </DialogActions>
        </div>
    );
};

export const LocalDeployStepFour = ({ handleCloseDeployModal, setDeployStep, handleLocalDeployment, handleDeployChange, linux, windows }) => {
    return (
        <div>
            <DialogTitle
                id="project-cloning-dialog"
                onClose={handleCloseDeployModal}
            >
                Choose Platforms
            </DialogTitle>
            <DialogContent dividers>
                <Typography variant="body1" gutterBottom style={{ marginRight: "30px" }}>
                    Step 4: Select the required platforms.
                </Typography>
                <FormControl component="fieldset">
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
                    onClick={() => setDeployStep(2)}
                    color="secondary"
                >
                    Previous Step
                </Button>
                {(linux || windows) && (
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
