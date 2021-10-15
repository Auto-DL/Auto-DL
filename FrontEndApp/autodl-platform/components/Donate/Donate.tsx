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
    boxShadow: '24px',
    padding: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  amount: {
    width: '100px',
  },
  amountContainer: {
    display: 'flex', 
    justifyContent: 'space-between', 
    fontSize: '20px', 
    marginTop: '30px',
    marginBottom: '20px',
  },
  actionBtn: {
    width: '180px',
  },
  actionBtnContainer:{
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '15px',
    marginBottom: '10px'
  }
});

export default function Donate() {
  const classes = useStyles();

  const defaultDonateAmount = [50, 200, 500, 1000, ];
  const [donateAmount, setDonateAmt] = React.useState<number>(0);
  const [donateModalOpen, setDonateModalOpen] = React.useState<boolean>(false);

  const modalOpen = () => setDonateModalOpen(true);
  const modalClose = () => setDonateModalOpen(false);

  const handleDonateAmount = (amount: number) => {
    setDonateAmt(amount);
  }

  const displayRazorpay = (amt: number) => {
    alert(amt);
    setDonateAmt(0);
    modalClose();
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
        aria-labelledby="amount-modal-title"
        aria-describedby="amount-modal-description"
      >
        <Box className={classes.modalBox}>
          <Typography id="amount-modal-title" variant="h5" component="h3" style={{paddingBottom: "10px"}}>
            Support Auto-DL
          </Typography>

          <Typography id="amount-modal-description">
            We help you make Deep Learning models without writing a single line of code!
          </Typography>

          <div className={classes.amountContainer}>
            {defaultDonateAmount.map((amount: number) => 
              <Button 
                key={amount}
                value={amount}
                className={classes.amount}
                color="primary"
                variant={donateAmount === amount ? "contained" : "outlined"}
                onClick={() => handleDonateAmount(amount)}
              >
                ₹ {amount}
              </Button>
            )}

            <TextField 
              className={classes.amount}
              label="Amount"
              variant="outlined"
              placeholder="Other"
              onChange={
                (e) => handleDonateAmount(Number(e.target.value))
              }
              InputProps={{
                startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              }}
            />
          </div>

          <div className={classes.actionBtnContainer}>
            <Button
              onClick={() => modalClose()}
              className={classes.actionBtn}
              color="primary"
              variant="outlined"
            >
                Go Back
            </Button>
            <Button
              onClick={() => displayRazorpay(donateAmount)}
              className={classes.actionBtn}
              color="primary"
              variant="contained"
              type="submit"
            >
              Proceed
            </Button>
          </div>
        </Box>
      </Modal>      
    </div>
  );
}
