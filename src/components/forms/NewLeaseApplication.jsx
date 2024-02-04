import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  ProgressBar,
  Step,
  StepLabel,
  Stepper,
} from "react-bootstrap";

const formSteps = [
  {
    label: "Property Details",
    fields: ["property_id", "lease_start", "lease_end"],
  },
  { label: "Rent Details", fields: ["rent_amount", "payment_due_day"] },
  { label: "Utilities", fields: ["utility_by_owner", "utility_by_tenant"] },
  {
    label: "Terms",
    fields: ["lease_clauses", "renewal_term", "early_terminate_con"],
  },
];

const NewLeaseApplication = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [leaseData, setLeaseData] = useState({});

  const isLastStep = activeStep === formSteps.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      submitForm();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaseData({ ...leaseData, [name]: value });
  };

  const submitForm = () => {
    console.log(leaseData);
  };

  const progress = ((activeStep + 1) / formSteps.length) * 100;

  return (
    <Container>
      <ProgressBar now={progress} />
      <Stepper activeStep={activeStep}>
        {formSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Form>
        {formSteps[activeStep].fields.map((field) => (
          <Form.Group key={field}>
            <Form.Label>{field.replace(/_/g, " ")}</Form.Label>
            <Form.Control
              type="text"
              placeholder={`Enter ${field.replace(/_/g, " ")}`}
              name={field}
              value={leaseData[field] || ""}
              onChange={handleChange}
            />
          </Form.Group>
        ))}
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button onClick={handleNext}>{isLastStep ? "Submit" : "Next"}</Button>
      </Form>
    </Container>
  );
};

export default NewLeaseApplication;
