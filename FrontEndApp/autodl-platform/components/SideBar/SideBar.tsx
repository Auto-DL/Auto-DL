import React from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Settings from '@material-ui/icons/Settings';
import Routes from 'utils/routes';
import Router from 'next/router';

import Donate from 'components/DonateUs/Donate';

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
    grow: {
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
    },
    modalBox: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 600,
      backgroundColor: '#e7eef4',
      border: '1px solid #000',
      borderRadius: '5px',
      boxShadow: "24px",
      padding: "20px",
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',        
    },
    donate: {
      width: "84px"
    },
    paymentValueContainer: {
      display: 'flex',
      justifyContent: 'space-between', 
      fontSize: "20px",
      margin: "30px"
    }
  }),
);

export default function SideBar({ activeTab, projectName }: Props) {

  const classes = useStyles();
  
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      variant={open ? "permanent" : "permanent"}
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
        {Routes.map((route) => (
          <ListItem
            button
            key={route.name}
            onClick={() => Router.push(`/project${route.path}?projectName=${projectName}`)}
            className={clsx(classes.icon, {
              [classes.active]: route.name == activeTab,
              [classes.inactive]: route.name != activeTab,
            })}
          >
            <ListItemIcon style={{ color: 'white' }}><route.icon /></ListItemIcon>
            <ListItemText primary={route.name} style={{color: "white"}}/>
          </ListItem>
        ))}
      </List>
      <div className={classes.grow} />
      <Divider />
      <List>
        <ListItem button key='Settings' onClick={() => Router.push('/')}>
          <ListItemIcon><Settings style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary='Settings' style={{ color: 'white' }} />
        </ListItem>
      </List>
      <Donate/>
    </Drawer>
  );
}
