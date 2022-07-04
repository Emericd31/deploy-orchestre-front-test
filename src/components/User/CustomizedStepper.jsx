import React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';

export default function CustomizedStepper(props) {

  const handleStep = (step) => () => {
    if (props.completed[step] === true || (props.completed[props.currentStep] === true && step === (props.currentStep + 1))) {
      props.setCurrent(step);
    }
  };

  return (
    <Box>
      <Stepper nonLinear activeStep={props.currentStep}>
        {props.steps.map((label, index) => (
          <Step key={label} completed={props.completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
    </Box >
  );
}