import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class FormPersonalDetails extends Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, handleChange } = this.props;
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

export default FormPersonalDetails;