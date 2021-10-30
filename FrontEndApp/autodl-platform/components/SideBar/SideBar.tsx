import React from 'react';
import clsx from 'clsx';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from '@mui/material/Drawer';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Router from 'next/router';

import { AppRoutes, ProjectRoutes } from 'utils/routes';
import { store } from "app/store";
import { useAppDispatch } from "app/hooks";
import { logout } from "app/userSlice";
import AuthService from "components/AuthForm/AuthService";
import Donate from "../Donate/Donate";

type Props = {
  activeTab?: string;
  projectName?: string | string[] | undefined;
};

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    sideBarGrow: {
      flexGrow: 1,
    },
    icon: {
      color: theme.palette.background.default,
      opacity: '0.6',
      fontSize: '20px'
    },
    active: {
      color: '#FFFFFF',
      opacity: '1',
      fontSize: '20px'
    },
    inactive: {
      color: '#FFFFFF',
      opacity: '0.5',
      fontSize: '20px'
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      overflowX: 'hidden',
      whiteSpace: 'nowrap',
      backgroundColor: theme.palette.primary.main
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
    paymentValueContainer: {
      display: 'flex',
      justifyContent: 'space-between', 
      fontSize: "20px",
      margin: "30px"
    }      
    },
  }),
);

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SideBar({ activeTab, projectName }: Props) {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState<boolean>(false);
  const [alert, setAlert] = React.useState({
    message: "This is alert msg",
    severity: "warning",
  });

  const handleAlertClose = (_?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(true);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    const username = store.getState().user.username;
    if(username) {
      AuthService.logout(username).then((response) => {
        setAlert({
          message: response.message ? response.message : "",
          severity: response.status ? "success" : "error",
        });
        dispatch(logout);
        Router.push("/");
      });
    }
  };

  return (
    <Drawer
      variant={"permanent"}
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleDrawerClose}
    >
      <Toolbar />
      <List>
        {ProjectRoutes.map((route) => (
          <ListItem
            button
            key={route.name}
            onClick={() => {
              projectName ?
                Router.push(`/project${route.path}?projectName=${projectName}`) :
                Router.push(`/project${route.path}`)
            }}
            className={clsx(classes.icon, {
              [classes.active]: route.name == activeTab,
              [classes.inactive]: route.name != activeTab,
            })}
          >
            <ListItemIcon style={{ color: 'inherit' }}><route.icon /></ListItemIcon>
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <div className={classes.sideBarGrow} />
      <Divider />
      <List>
        {AppRoutes.map((route) => (
            <ListItem
              button
              key={route.name}
              onClick={route.name == "Logout" ?
              handleLogout
              : () => {
                Router.push(route.path);
              }}
              className={clsx(classes.icon, {
                [classes.active]: route.name == activeTab,
                [classes.inactive]: route.name != activeTab,
              })}
            >
              <ListItemIcon style={{ color: 'inherit' }}><route.icon /></ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
      </List>
      <Snackbar
        open={openAlert}
        data-testid={"warning"}
        autoHideDuration={5000}
        onClose={handleAlertClose}
      >
        <Alert onClose={handleAlertClose} severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
      <Donate/>
    </Drawer>
  );
}
