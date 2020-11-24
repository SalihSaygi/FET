import React, { useState } from 'react';
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider, makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({ 
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  }
}))

export default function FormUserDetails(props) {

  const classes = useStyles()

  const [values, setValues] = useState({
    password: '',
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.nextStep();

  return (
    <>
      <MuiThemeProvider>
        <>
          <Dialog
            open
            fullWidth
            maxWidth='sm'
          >
            <AppBar title="Enter User Details" />
              <TextField
                placeholder="Enter Your Nickname"
                label="Nickname"
                onChange={handleChange('nickname')}
                defaultValue={values.nickname}
                margin="normal"
                fullWidth
              />
              <TextField
                placeholder="Enter Your First Name"
                label="First Name"
                onChange={handleChange('firstName')}
                defaultValue={values.firstName}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Last Name"
                label="Last Name"
                onChange={handleChange('lastName')}
                defaultValue={values.lastName}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Email"
                label="Email"
                onChange={handleChange('email')}
                defaultValue={values.email}
                margin="normal"
                fullWidth
              />
              <br />
              <TextField
                placeholder="Enter Your Phone Number"
                label="Phone Number"
                onChange={handleChange('phoneNumber')}
                defaultValue={values.phoneNumber}
                margin="normal"
                fullWidth
              />
              <br />
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {values.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <br/>
              <Button
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >Continue</Button>
          </Dialog>
        </>
      </MuiThemeProvider>
    </>
    );
}}