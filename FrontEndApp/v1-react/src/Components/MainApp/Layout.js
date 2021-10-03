import React from "react";
import clsx from "clsx";
import Axios from "axios";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from "@material-ui/icons/Home";
import Icon from "@material-ui/core/Icon";
import SvgIcon from '@material-ui/core/SvgIcon';
import { useHistory } from "react-router-dom";
// import Razorpay from 'razorpay';
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  logout: {
    bottom: "0",
  },
  donateButton: {
    top: "650px"
  }
}));

function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  var username = JSON.parse(localStorage.getItem("username"));

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const home = () => {
    console.log("home");
    history.push("/home");
    handleDrawerClose();
  };

  const deploy = () => {
    console.log("deployments");
    history.push("/deploy");
    handleDrawerClose();
  };

  const logout = () => {
    localStorage.clear();
    history.push("/login");
    window.location.reload();
  };

  const loadScript = (src) => {
    return new Promise(resolve => {
      const script = document.createElement("script");
      script.src = src
      script.onload = () => {
        resolve(true)
      } 
      script.onerror = () => {
        resolve(false)
      }
      document.body.appendChild(script);
    })
  }

  async function displayRazorpay() {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res) {
      alert("Razorpay Sdk Failed to load")
      return
    }

    
    // var data;
    // try {
    //    data = await fetch('http://localhost:8000/payments/', {method: 'POST'}).then((t) => {
    //     console.log(t)
    //   })
    // } catch(e){
    //   console.log(e)
    // }
    // console.log("Razorpay data: ", data)

    const data = await Axios({
      url: `http://localhost:8000/payments/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // data: bodyData,
    }).then((res) => {
      console.log("Data: ",res)
      return res;
    });


    var options = {
        key: 'rzp_test_j9RsK0fDeYlYxn', // Enter the Key ID generated from the Dashboard
        amount: data.data.payment.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "AutoDl",
        description: "Donate/Support Us ",
        image: "https://raw.githubusercontent.com/Auto-DL/Auto-DL/main/static/Logo.png",
        order_id: data.data.payment.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)
        },
        prefill: {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    // var rzp1 = new Razorpay(options);
  }


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        style={{ background: "#4467c6" }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          {username !== null ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
          ) : null}

          <Typography variant="h6" noWrap>
            Auto-DL
          </Typography>
        </Toolbar>
      </AppBar>
      {username !== null ? (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>

          <Divider />

          <List>
            <ListItem button onClick={home} key={"Home"}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Home"} />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem button onClick={deploy} key={"Deploy"}>
              <ListItemIcon>
                <Icon aria-label="deploy">
                  <SvgIcon viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 22L16.14 20.45C16.84 18.92 17.34 17.34 17.65 15.73L20 22M7.86 20.45L4 22L6.35 15.73C6.66 17.34 7.16 18.92 7.86 20.45M12 2C12 2 17 4 17 12C17 15.1 16.25 17.75 15.33 19.83C15 20.55 14.29 21 13.5 21H10.5C9.71 21 9 20.55 8.67 19.83C7.76 17.75 7 15.1 7 12C7 4 12 2 12 2M12 12C13.1 12 14 11.1 14 10C14 8.9 13.1 8 12 8C10.9 8 10 8.9 10 10C10 11.1 10.9 12 12 12Z" />
                  </SvgIcon>
                </Icon>
              </ListItemIcon>
              <ListItemText primary={"Deploy"} />
            </ListItem>
          </List>

          <Divider />

          <List>
            <ListItem
              button
              onClick={logout}
              className={classes.logout}
              key={"logout"}
            >
              <ListItemIcon>
                <PowerSettingsNewIcon />
              </ListItemIcon>
              <ListItemText primary={"Logout"} />
            </ListItem>
          </List>


          <List>
            <ListItem 
              button
              className={classes.donateButton}
              onClick={displayRazorpay}
            >
              <ListItemIcon>
                <AttachMoneyIcon/>
              </ListItemIcon>
              <ListItemText primary={"Donate/Support Us"}/>
            </ListItem>
          </List>


        </Drawer>
      ) : null}
      <main className={classes.content}>
        <div className={classes.toolbar} />
      </main>
    </div>
  );
}

export default Layout;
