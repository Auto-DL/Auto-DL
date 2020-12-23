import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
// import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
// import Register from './Register' ;
import LoginService from './LoginService'
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import {
  BrowserRouter as Router,
  Switch,
  useLocation,
  IndexRoute,
  Route,
  Link,
  Redirect,
  useParams
} from "react-router-dom";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={5}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 500,
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


function LoginForm() {
  const classes = useStyles();
  const theme = useTheme();
  const [values, setValues] = React.useState({
    username:'',
    email:'',
    first_name:'',
    last_name:'',
    password: '',
    showPassword: false,
  });

  const [open, setOpen] = React.useState(false);
  const [alert, setalert] = React.useState({
    msg:'This is alert msg',
    severity:"warning"
  });


  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [value, setValue] = React.useState(0);

  const handleChangetabs = (event, newValue) => {
    setValue(newValue);
  };


  const login = async () => {
    const data={
      'username':values.username,
      'password':values.password
    }
    console.log(data);
    // vallidation
    if(values.username !=='' && values.password !== ''){
        const res = await LoginService.login(data)
        if (res.status === 200) {
          // const data = res.data.data.data
          console.log(res);
          setalert({ ...values, 'msg':"Login succesfull",'severity':"success" });

        }
        else{
          setalert({ ...values, 'msg':"Login failed",'severity':"error" });
        }
    }
    else{
      setalert({ ...values, 'msg':"Please fill all the details",'severity':"warning" });
    }
    setOpen(true);
       
  }
  
  const register = async () => {
    const data={
      'username':values.username,
      'first_name':values.first_name,
      'last_name':values.last_name,
      'email':values.email,
      'password':values.password
    }
    console.log(data);
    // vallidation
    if(values.username !=='' && values.password !== '' && values.first_name !=='' && values.last_name !== ''&& values.email !== ''){
      const res = await LoginService.register(data)
        if (res.status === 200) {
          // const data = res.data.data.data
          console.log(res);
              setalert({ ...values, 'msg':"Login succesfull",'severity':"success" });
        }     
      else{
        setalert({ ...values, 'msg':"Login failed",'severity':"error" });
      }
  }
  else{
    setalert({ ...values, 'msg':"Please fill all the details",'severity':"warning" });
  }
  setOpen(true);

        
	}

  return (
    <>

    {/* <h1>LoginForm</h1> */}
    <br/>
    <br/>


      <Grid container>
          <Grid item lg={4} md={4} sm={1} xs={1} >
          </Grid>
          
          <Grid item lg={4} md={4} sm={10} xs={10} >
              <div className={classes.root}>
                   <AppBar position="static" color="default">
                        <Tabs
                          value={value}
                          onChange={handleChangetabs}
                          indicatorColor="primary"
                          textColor="primary"
                          variant="fullWidth"
                          aria-label="full width tabs example"
                        >
                          <Tab label="Login" {...a11yProps(0)} />
                          <Tab label="Register" {...a11yProps(1)} />
                          {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
                        </Tabs>
                  </AppBar>
                 
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <Grid container>
                      
                           <Grid item lg={12} md={12} sm={12} xs={12} >

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="Username"
                            label="Username"
                            name="Username"
                            autoComplete="Username"
                            autoFocus
                            // helperText={`${this.state.password_limit}/10`}
                            // FormHelperTextProps={{
                            //   classes:{
                            //     root: classe.lef,
                            //     // error: classes.yourErrorCSS
                            //   }
                            // }}
                            onChange={handleChange('username')}  
                          />
                  

                        <FormControl fullWidth 
                        // className={clsx(classe.margin, classe.textField)} 
                        margin="normal" variant="filled">
                            <InputLabel  htmlFor="outlined-adornment-password">Password *</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              type={values.showPassword ? 'text' : 'password'}
                              value={values.password}
                              onChange={handleChange('password')}
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>}
                              // labelWidth={70}
                              
                            />
                          </FormControl>

                    
                        <Grid container>
                            <Grid item lg={12} md={12} sm={12} xs={12} >
                            <br/>
                          </Grid>
                        </Grid>

                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          // className={classe.submit}
                          onClick={login}
                        >
                        LOGIN
                        </Button>


                      </Grid>
                
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    <Grid container>
                      
                      <Grid item lg={12} md={12} sm={12} xs={12} >

                          <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              label="Username"
                              autoComplete="Username"
                              autoFocus
                              onChange={handleChange('username')}  
                            />
                             <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              label="First name"
                              autoComplete="First name"
                              // autoFocus
                              onChange={handleChange('first_name')}  
                            />
                            
                             <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Last name"
                            autoComplete="Last name"
                            // autoFocus
                            onChange={handleChange('last_name')}  
                          />

                            <TextField
                              variant="outlined"
                              margin="normal"
                              required
                              fullWidth
                              label="email"
                              autoComplete="email"
                              // autoFocus
                              onChange={handleChange('email')}  
                            />
                    

                          <FormControl fullWidth 
                          // className={clsx(classe.margin, classe.textField)} 
                          margin="normal" variant="filled">
                              <InputLabel  htmlFor="outlined-adornment-password">Password *</InputLabel>
                              <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>}
                                // labelWidth={70}
                                
                              />
                            </FormControl>

                      
                            <Grid container>
                                <Grid item lg={12} md={12} sm={12} xs={12} >
                                <br/>
                              </Grid>
                            </Grid>

                            <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              // className={classe.submit}
                              onClick={register}
                            >
                            Register
                            </Button>


                      </Grid>
           
                   </Grid>
                    </TabPanel>
                 
               </div>
         </Grid>
          
          <Grid item lg={4} md={4} sm={1} xs={1} >
          </Grid>
      </Grid>
      

      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity={alert.severity}>
          {alert.msg}
        </Alert>
      </Snackbar>


    </>
  );
}

export default LoginForm;