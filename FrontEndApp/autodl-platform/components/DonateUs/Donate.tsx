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

import PaymentIcon from '@material-ui/icons/Payment';
import Modal from '@material-ui/core/Modal';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment  from "@material-ui/core/InputAdornment"
import Axios from 'axios'
// import Razorpay from 'razorpay'

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
  const defaultDonateAmount = [50, 200, 500, 1000, ]

  const [donateAmt, setDonateAmt] = React.useState({amt:"0"});
  const [donateModalOpen, setDonateModalOpen] = React.useState(false);
  const modalOpen = () => setDonateModalOpen(true);
  const modalClose = () => setDonateModalOpen(false);

  
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

//   const handlePaymentSuccess = async (response:any) => {
//     console.log("Inside handlepaymentsuccess",response )
//     try {
//       let bodyData = new FormData();
//       bodyData.append("response", JSON.stringify(response))
//       console.log("Response", response);

//       // we will send the response we've got from razorpay to the backend to validate the payment
//       // bodyData.append("response", JSON.stringify(response));

//       await Axios({
//         url: `http://localhost:8000/payments/verify/`,
//         method: "POST",
//         data: bodyData,
//         headers: {
//           Accept: "application/json",
//           "Content-Type": "application/json",
//         },
//       })
//         // .then((res:any) => {
//         //   console.log("Everything is OK!", res);
//         //   // setName("");
//         //   // setAmount("");
//         // })
//         // .catch((err) => {
//         //   console.log(err);
//         // });
//     } 
//     catch (error) {
//       console.log(console.error());
//     }
//   };

  const loadScript = (src: string) => {
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

   const  displayRazorpayNew = async(amt:string) => {
    modalClose()
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if(!res) {
      alert("Razorpay Sdk Failed to load")
      return
    }
    const result = await Axios({
      url: `http://localhost:8000/payments/pay/`,
      data: {"amount": amt, "name": "Priyansh"},
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    }).then((res) => {
      console.log("Data: ",res)
      return res;
    });
    const { amount, id: order_id } = result.data;

    var options = {
        key: process.env.RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "AutoDL",
        description: "Thansk For Supporting Auto-DL",
        image: "https://raw.githubusercontent.com/Auto-DL/Auto-DL/main/static/Logo.png",
        order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        callback_url: `http://localhost:8000/payments/verify/`,
        data: {"name":"Priyansh", "amount": amount},
        // handler: function (response:any){
        //   handlePaymentSuccess(response)
        // },
        prefill: {
            "name": "Gaurav Kumar",
            "email": "gaurav.kumar@example.com",
            "contact": "9999999999"
        },
        theme: {
            "color": "#3399cc"
        }
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

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

      <ListItem button key='Donate' onClick={modalOpen}>
          <ListItemIcon><PaymentIcon style={{ color: 'white' }} /></ListItemIcon>
          <ListItemText primary='Donate' style={{ color: 'white' }} />
      </ListItem>

      <Modal
        open={donateModalOpen}
        onClose={modalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={clsx(classes.modalBox)}>
          <Typography id="modal-modal-title" variant="h5" component="h3" style={{paddingBottom: "10px"}}>
            Support Auto-DL
          </Typography>
          <Typography id="modal-modal-description">
          We help you make Deep Learning models without writing a single line of code!
        </Typography>
        <div className={classes.paymentValueContainer}>
          {defaultDonateAmount.map((amount) => 
          <TextField key='' className={clsx(classes.donate)}
            onClick={() => setDonateAmt({amt: `${amount}`})}
            id="standard-read-only-input"
            variant="outlined"
            value={amount}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              readOnly: true,
            }}
            />
          )}
          <TextField 
            style={{width: 100}}
            type="Number"
            label="Amount"
            onChange={(e) => setDonateAmt({amt: e.target.value})}
            className={clsx(classes.donate)}
            id="outlined-number"
            placeholder="Other"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />

        </div>
        <Button onClick={() => displayRazorpayNew(donateAmt.amt)} type="submit" variant="contained" color="primary" >Donate</Button>
        
        </Box>
      </Modal>
    </Drawer>
  );
}
