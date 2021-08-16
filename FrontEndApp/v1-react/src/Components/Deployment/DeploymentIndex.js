import { useStyles } from "./styles";
import { Typography, Grid } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

const Deployment = () => {
    const classes = useStyles();

    const handleCategoryPicker = async () => {
        const dirHandle = await window.showDirectoryPicker();
        const newDirHandle = await dirHandle.getDirectoryHandle("train", { create: false });
        for await (const entry of newDirHandle.values()) {
            if (entry.kind === "directory") {
                console.log(entry.kind, entry.name);
            } else {
                console.log("Select Correct Data Directory");
            }
        }
    }

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
