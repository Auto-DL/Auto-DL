import makeStyles from "@mui/styles/makeStyles";
import Grid from "@mui/material/Grid";
import { GetServerSidePropsContext } from "next";

import Main from "layouts/Main";
import ProjectCard from "components/ProjectCard/ProjectCard";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  // Get the user's session based on the request
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
