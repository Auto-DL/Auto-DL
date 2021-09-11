import React, { ReactNode } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import PrimaryAppBar from "components/AppBar/AppBar";
import SideBar from "components/SideBar/SideBar";

type Props = {
  children?: ReactNode;
  activeTab?: string;
  projectName?: string | string[] | undefined;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      margin: 'auto',
      marginTop: '3rem',
      minWidth: '100%',
    }
  }),
);

export default function Main({ children, projectName, activeTab }: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <PrimaryAppBar projectName={projectName} />
      <SideBar activeTab={activeTab} projectName={projectName} />
      <Container maxWidth='lg'>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
