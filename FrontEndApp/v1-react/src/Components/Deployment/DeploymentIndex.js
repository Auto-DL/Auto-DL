import { useStyles } from "./styles";
import { Typography, Grid } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Deployment = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>

            <Grid item lg={10} md={10} sm={10} xs={10}>
                <div>
                    <Typography
                        className={classes.title}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Deployments
                    </Typography>
                </div>
            </Grid>

            <Grid item lg={1} md={1} sm={1} xs={1}></Grid>
        </Grid>
    );
}

export default Deployment;
