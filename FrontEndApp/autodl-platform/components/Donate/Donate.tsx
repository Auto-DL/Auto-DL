import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PaymentIcon from '@material-ui/icons/Payment';
import Modal from '@material-ui/core/Modal';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputAdornment  from "@material-ui/core/InputAdornment"
// import Axios from "axios";

const useStyles = makeStyles({
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
    amountContainer: {
        display: 'flex', 
        justifyContent: 'space-between', 
        fontSize: '20px', 
        margin: '30px'        
    },
    modalTextField: {
        width: "84px",
        cursor: "pointer"
    },
    buttonContainer:{
      display: "flex",
      justifyContent: "space-evenly"
    }
  });


export default function Donate() {
  const classes = useStyles();

  const defaultDonateAmount = [50, 200, 500, 1000, ]

  type donateAmount = {
    amt: number
  }
  const [donateAmount, setDonateAmt] = React.useState<donateAmount>({ amt: 0 });
  const [donateModalOpen, setDonateModalOpen] = React.useState<boolean>(false);
  const modalOpen = () => setDonateModalOpen(true);
  const modalClose = () => setDonateModalOpen(false);


  const displayRazorpay = (amt:any) => {
    alert(amt)
    setDonateAmt({amt: 0})
    modalClose()
  }

  return (
    <div>
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
        <Box className={classes.modalBox}>
          <Typography id="modal-modal-title" variant="h5" component="h3" style={{paddingBottom: "10px"}}>
            Support Auto-DL
          </Typography>
          <Typography id="modal-modal-description">
          We help you make Deep Learning models without writing a single line of code!
        </Typography>
        <div className={classes.amountContainer}>
          {defaultDonateAmount.map((amount:number) => 
          <TextField 
            key={amount}
            className={classes.modalTextField}
            onClick={() => setDonateAmt({amt: amount})}
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
            label="Amount"
            type="number"
            onChange={
              (e) => setDonateAmt({amt: (e.target as HTMLInputElement).valueAsNumber})
            }
            id="outlined-number"
            placeholder="Other"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
          />

        </div>
        <div className={classes.buttonContainer}>
          <Button
            onClick={() => modalClose()}
            type="submit" variant="outlined" color="primary" >Go Back</Button>
          <Button
            onClick={() => displayRazorpay(donateAmount.amt)} 
            type="submit" variant="contained" color="primary" >Donate</Button>
        </div>
        </Box>
      </Modal>      
    </div>
  );
}
