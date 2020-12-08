import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box'
import CssBaseline from '@material-ui/core/CssBaseline';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = theme => ({ 
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
})

class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange, classes } = this.props

    return (
      <MuiThemeProvider>
        <>
          <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
            <AppBar title="Enter Personal Details (optional)" />
            <TextField
              placeholder="Enter Your Profile Picture"
              label="Profile Picture"
              onChange={handleChange('profilePhoto')}
              defaultValue={values.profilePhoto}
              margin="normal"
              className={classes.textField}
            />
            <br />
            <TextField
              placeholder="Enter Your City"
              label="City"
              onChange={handleChange('city')}
              defaultValue={values.city}
              margin="normal"
              className={classes.textField}
            />
            <br />
            <TextField
              placeholder="Enter Your Bio"
              label="Bio"
              onChange={handleChange('bio')}
              defaultValue={values.bio}
              margin="normal"
              className={classes.textField}
            />
            <br />
            <TextField
              placeholder="Enter Your Age"
              label="Age"
              onChange={handleChange('age')}
              defaultValue={values.age}
              margin="normal"
              className={classes.textField}
            />
            <br />
            <TextField
              placeholder="Enter Your Pronouns"
              label="Bio"
              onChange={handleChange('bio')}
              defaultValue={values.bio}
              margin="normal"
              className={classes.textField}
            />
            <br />
            <Button
              color="secondary"
              variant="contained"
              onClick={this.back}
            >Back</Button>

            <Button
              color="primary"
              variant="contained"
              onClick={this.continue}
            >Continue</Button>
          </Box>
        </>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(FormPersonalDetails);