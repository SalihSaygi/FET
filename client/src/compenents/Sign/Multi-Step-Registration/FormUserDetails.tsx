import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider, makeStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Box from '@material-ui/core/Box';
// import { Brightness7 as DarkThemeIcon } from '@material-ui/icons';
// import { Brightness3 as LightThemeIcon } from '@material-ui/icons';
// import { blue } from '@material-ui/core/colors';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Grid from '@material-ui/core/Grid'
// import NumberFormat from 'react-number-format';
// import MaskedInput from 'react-text-mask';
// import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles((theme) => ({ 
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '35ch',
  },
  submitButton: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  logo: {
    maxWidth: 70,
  }
}))

// const light = {
//   palette: {
//     type: "light",
//     secondary: {
//       main: blue[200]
//     }
//   }
// };
// const dark = {
//   palette: {
//     type: "dark",
//     secondary: {
//       main: blue[600]
//     },
//   }
// };

export default function FormUserDetails(props) {

  //Dark/Light Theme (1st-way)
  // const [isDark, setIsDark] = useState(true)
  // const icon = isDark ? <DarkThemeIcon/> : <LightThemeIcon/>
  // const appliedTheme = createMuiTheme(isDark ? dark : light)

  //Dark/Light Theme (2nd-way)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const appliedTheme = useMemo(() => createMuiTheme({
    palette: {
        type: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  )
  
  const classes = useStyles()

  const [passValue, setPassValue] = useState({
    password: '',
    showPassword: false,
  });

  //Phone Number (2)
  // function TextMaskCustom(props) {
  //   const { inputRef, ...other } = props;
  
  //   return (
  //     <MaskedInput
  //       {...other}
  //       ref={(ref) => {
  //         inputRef(ref ? ref.inputElement : null);
  //       }}
  //       mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
  //       placeholderChar={'\u2000'}
  //       showMask
  //     />
  //   )
  // }
  
  // TextMaskCustom.propTypes = {
  //   inputRef: PropTypes.func.isRequired,
  // }

  // const [mask, setMask] = useState({
  //   textmask: '(1  )    -    '
  // })


  // const handleMaskChange = (event) => {
  //   setMask({
  //     ...mask,
  //     [event.target.name]: event.target.value,
  //   })
  // }

  //----------------------------------------------

  // const props.handleChange = (prop) => (event) => {
  //   setValues({ ...props, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setPassValue({ ...props, showPassword: !props.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.nextStep();
  }

  // rgb(34, 47, 63) //dark theme
  // rgb(163, 200, 245) //light theme

  return (
    <>
      {/* <IconButton
        edge="end"
        color="inherit"
        aria-label="mode"
        // onClick={() => setIsDark(!isDark)} //(1st-way)
      >
        {icon}
      </IconButton> */}
      
      <img src="../../../sources/images/logo.png" alt="logo" className={classes.logo} />
      <MuiThemeProvider theme={appliedTheme} >
        <CssBaseline/>
        <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <AppBar title="Enter User Details" />
              <TextField
                item xs={4}
                style={{textAlign: "center"}}
                placeholder="Enter Your Nickname"
                label="Nickname"
                onChange={props.handleChange('nickname')}
                defaultValue={props.nickname}
                margin="normal"
                className={classes.textField}
              />
              <TextField
                placeholder="Enter Your First Name"
                item xs={4}
                style={{textAlign: "center"}}
                label="First Name"
                onChange={props.handleChange('firstName')}
                defaultValue={props.firstName}
                margin="normal"
                className={classes.textField}
              />
              <br />
              <TextField
                item xs={4} 
                style={{textAlign: "center"}}
                placeholder="Enter Your Last Name"
                label="Last Name"
                onChange={props.handleChange('lastName')}
                defaultValue={props.lastName}
                margin="normal"
                className={classes.textField}
              />
              <br />
              <TextField
                item xs={4} 
                style={{textAlign: "center"}}
                placeholder="Enter Your Email"
                label="Email"
                onChange={props.handleChange('email')}
                defaultValue={props.email}
                margin="normal"
                className={classes.textField}
              />
              <br />
              <TextField
                item xs={4} 
                style={{textAlign: "center"}}
                placeholder="Enter Your Phone Number"
                label="Phone Number"
                onChange={props.handleChange('phoneNumber')}
                defaultValue={props.phoneNumber}
                margin="normal"
                className={classes.textField}
              />
              {/* Phone Number (2) */}
              {/* <FormControl>
                <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
                <Input
                  value={mask.textmask}
                  onChange={handleMaskChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  style={{width: "31ch"}}
                  />
                  </FormControl> */}
              <br />
              <FormControl 
                item xs={4} 
                style={{textAlign: "center"}} 
                className={clsx(classes.margin, classes.textField)}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input
                  id="standard-adornment-password"
                  type={passValue.showPassword ? 'text' : 'password'}
                  value={setPassValue.password}
                  onChange={props.handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {passValue.showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <br/>
              <Button
                item xs={4} 
                style={{textAlign: "center"}}
                color="primary"
                variant="contained"
                onClick={handleSubmit}
                className={classes.submitButton}
              >Continue</Button>
        </Box>
      </MuiThemeProvider>
    </>
    )
}