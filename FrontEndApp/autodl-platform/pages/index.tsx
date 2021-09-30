import React from "react";
import Auth from "layouts/Auth";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { makeStyles, Theme, styled } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginTop: '8rem',
  },
  form: {
    padding: '20px',
  },
  formHeaderText: {
    textAlign: 'center',
    paddingTop: '5px',
    paddingBottom: '20px',
  },
  formElement: {
    marginTop: '15px',
    marginBottom: '15px',
  },
  forgotPass: {
    fontSize: '100%',
    marginTop: '15px',
    cursor: 'pointer',
    textDecoration: 'underline',
    display: 'inline-block',
  },
  actionButtons: {
    display: 'flex',
    justifyContent: 'space-evenly',
    padding: '20px',
  },
  actionBtn: {
    margin: '12px',
    paddingTop: '5px',
    paddingBottom: '5px',
    width: 200,
  }
});

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  backgroundColor: theme.palette.primary.main,
  opacity: 0.95,
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
  },
  '&:focus': {
    boxShadow: `0 0 0 0.2rem ${theme.palette.secondary.main}`,
  },
}));

interface State {
  username: string;
  password: string;
  showPassword: boolean;
}

export default function Home() {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    username: '',
    password: '',
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Auth>
      <Paper elevation={3} className={classes.root}>
        <Box
          component="form"
          className={classes.form}
        >
          <Typography variant="h4" component="h2" className={classes.formHeaderText}>
            Sign In
          </Typography>

          <TextField
            id="username"
            name="username"
            label="Username"
            fullWidth
            className={classes.formElement}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            error={false}
            required
            autoFocus
            autoComplete="Username"
            onChange={handleChange('username')}
            variant="outlined"
          />

          <FormControl
            variant="outlined"
            fullWidth
            required
            className={classes.formElement}
          >
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              name="password"
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
                </InputAdornment>
              }
              label="Password"
            />
          </FormControl>

          <Typography className={classes.forgotPass}>
            Forgot your password?
          </Typography>

          <div className={classes.actionButtons}>
            <Button className={classes.actionBtn} variant="outlined">
              Log in
            </Button>
            <StyledButton className={classes.actionBtn}>
              Register
            </StyledButton>
          </div>

        </Box>
      </Paper>
    </Auth>
  );
}
