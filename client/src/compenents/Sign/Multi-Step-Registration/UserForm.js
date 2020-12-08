import React, { Component } from 'react';
import FormUserDetails from './FormUserDetails';
import FormPersonalDetails from './FormPersonalDetails';
import Confirm from './Confirm';
import Success from './Success';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    width: '100%',
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
})

class Register extends Component {
  state = {
    step: 1,
    nickname: '',
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    phoneNumber: '',
    adress: '',
    profilePhoto: '',
    age: '',
    pronouns: '',
    bio: ''
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  };

  resetStep = () => {
    const { step } = this.state;
    this.setState({
      step: 1
    })
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  };

  getStepLabels() {
    return ['Required User Details', 'Optional User Details', 'Confirm']
  }
    
  getStepContent(step) {
    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={this.nextStep}
            handleChange={this.handleChange}
            values={this.state.values}
          />
        );
      case 2:
        return (
          <FormPersonalDetails
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            handleChange={this.handleChange}
            values={this.state.values}
          />
        );
      case 3:
        return (
          <Confirm
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={this.state.values}
          />
        );
      case 4:
        return <Success />;
      default:
        (console.log('This is a multi-step form built with React.'))
        return 'Unknown Index'
    }
  }

  render() {

    const { nickname, firstName, lastName, password, email, phoneNumber, adress, profilePhoto, age, pronouns, bio } = this.state;
    const values = { nickname, firstName, lastName, password, email, phoneNumber, adress, profilePhoto, age, pronouns, bio };

    const { classes } = this.props;
    const { step } = this.state;
    const steps = this.getStepLabels()
    
    return(
    <>
      <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {step === steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={this.resetStep}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{this.getStepContent(step)}</Typography>
              <div>
                <Button
                  disabled={step === 0}
                  onClick={this.prevStep}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={this.nextStep}>
                  {step === steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }
}

Register.propTypes = {
  classes: PropTypes.object.isRequired,
}
  
export default withStyles(styles)(Register);