import React, { ReactNode } from "react";
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
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
      {/* To be configured with Redux - isAuthenticated */}
      <PrimaryAppBar projectName={projectName} isAuthenticated={true} />
      <SideBar activeTab={activeTab} projectName={projectName} />
      <Container maxWidth='lg'>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
