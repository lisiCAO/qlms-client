import React, { useState, useEffect } from "react";
import { Container, Form, Button, ProgressBar, Row, Col } from "react-bootstrap";
import { PersonCircle, GeoAlt, Telephone, CardChecklist } from "react-bootstrap-icons";
import ApiService from "../../../services/ApiService";


const steps = [
  {
    label: "Contact Information",
    fields: ["first_name", "last_name", "phone_number", "email"],
    icon: <Telephone />,
  },
  {
    label: "Address",
    fields: ["street_number", "street_name", "city_name", "postcode", "province"],
    icon: <GeoAlt />,
  },
  {
    label: "Personal Details",
    fields: ["date_of_birth", "profile_picture_url", "national_id"],
    icon: <PersonCircle />,
  },
  {
    label: "Additional Information",
    fields: ["employer_info", "bank_info", "reference_url"],
    icon: <CardChecklist />,
  },
];

const FormField = ({ field, formData, handleChange, disabled }) => (
  <Form.Group as={Row} controlId={field}>
    <Form.Label column sm={2}>
      {field.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
    </Form.Label>
    <Col sm={10}>
      <Form.Control
        type="text"
        placeholder={field.split("_").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}
        name={field}
        value={formData[field]}
        onChange={handleChange}
        disabled={disabled} 
      />
    </Col>
  </Form.Group>
);

const UpdateUserForm = ({ userData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({ ...userData });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setFormData({ ...userData });
  }, [userData]);

  const handleStepChange = (stepChange) => {
    setCurrentStep(prevStep => prevStep + stepChange);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    ApiService.updateUser(userData.id, formData)
      .then(response => {
        setSuccess("User updated successfully");
        setMessage("");
      })
      .catch(error => {
        setMessage(`Failed to update user data. Please try again. ${error.message}`);
        setSuccess("");
      });
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Container>
      <ProgressBar now={progress} />
      <Form onSubmit={handleSubmit}>
        <h3>{steps[currentStep].label}</h3>
        {steps[currentStep].icon}
        {steps[currentStep].fields.map((field) => (
          <FormField
            key={field}
            field={field}
            formData={formData}
            handleChange={handleChange}
            disabled={["email", "username", "role"].includes(field)}
          />
        ))}
        <Row className="mt-4">
            {message && <p className="text-danger">{message}</p>}
            {success && <p className="text-success">{success}</p>}
          <Col>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={() => handleStepChange(-1)}>
                Previous
              </Button>
            )}
          </Col>
          
          <Col className="text-right">
            {currentStep < steps.length - 1 ? (
              <Button variant="primary" onClick={() => handleStepChange(1)}>
                Next
              </Button>
            ) : (
              <Button variant="success" type="submit">
                Update
              </Button>
            )}
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default UpdateUserForm;