import { makeStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { green } from '@material-ui/core/colors';
import CloseIcon from "@material-ui/icons/Close";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";

export const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

export const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton
                    ariaLabel="close"
                    className={classes.closeButton}
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

export const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export const StyledCheckbox = withStyles({
    root: {
        '&$checked': {
            color: green[600],
            backgroundColor: green[0],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

export const useStyles = makeStyles({
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
    input: {
        display: 'none',
    },
    pklUploadBtn: {
        marginTop: "10px",
    },
    dataDirUploadBtn: {
        marginTop: "10px",
    },
    pklFileName: {
        paddingTop: "15px",
        fontSize: "105%",
    },
    categories: {
        paddingTop: "15px",
        fontSize: "105%",
    },
});
