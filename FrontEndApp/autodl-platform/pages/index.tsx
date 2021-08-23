import Main from "layouts/Main";
import ProjectCard from "components/ProjectCard/ProjectCard";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <Main>
      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <ProjectCard projectName="Project1" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard projectName="Project2" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard projectName="Project3" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard projectName="Project4" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard projectName="Project5" />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard projectName="Project6" />
          </Grid>
        </Grid>
      </div>
    </Main>
  );
}
