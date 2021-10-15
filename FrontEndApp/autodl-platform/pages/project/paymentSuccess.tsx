import { useRouter } from "next/router";
import Main from "layouts/Main";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import InputAdornment  from "@material-ui/core/InputAdornment"

export default function ProjectHome() {
  const router = useRouter();
  const userName = router.query.name;
  const amount = router.query.amount;
  return (
    <Main activeTab="Dashboard">
        <Box >
          <Typography id="modal-modal-title" variant="h5" component="h3" style={{paddingBottom: "10px"}}>
            Payment Successfull
          </Typography>
          <Typography id="modal-modal-description">
          Auto-DL helps you make Deep Learning models without writing a single line of code and giving as little input as possible.
        </Typography>
        <div style={{display: 'flex', justifyContent: 'center', fontSize: '20px', margin: '30px'}}>
          <TextField 
            style={{width: 100}}
            value={userName}
            type="text"
            id="filled-read-only-input"
            variant="outlined"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField 
            type="text"
            style={{width: 100}}
            value={amount}
            id="filled-read-only-input"
            variant="outlined"
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
              readOnly: true,
            }}
          />
        </div>
        </Box>
    </Main>
  );
}