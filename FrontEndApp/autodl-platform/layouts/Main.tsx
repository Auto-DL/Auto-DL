import React, { ReactNode} from "react";
import { Theme } from '@mui/material/styles';
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

const useStyles = makeStyles((theme : Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      marginTop: '3rem',
      maxWidth: '100%'
    },
    container: {
      padding:' 0 5rem',
      [theme.breakpoints.down('sm')]: {
        padding:'0 4rem',
      },
    }
  }),
);

export default function Main({ children, projectName, activeTab }: Props) {
  const classes = useStyles();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <Box className={classes.root}>
      {/* To be configured with Redux - isAuthenticated */}
      <PrimaryAppBar projectName={projectName} isAuthenticated={true} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
      <SideBar activeTab={activeTab} projectName={projectName} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Container className={classes.container} maxWidth={'xl'}>
        <Toolbar />
        {children}
      </Container>
    </Box>
  );
}
