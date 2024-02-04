import React, { useState } from 'react';
import { Container, Form, Button, ProgressBar, Row, Col, Image } from 'react-bootstrap';
import { PersonCircle, GeoAlt, Telephone, CardChecklist } from 'react-bootstrap-icons';


  
const steps = [
  {
    label: 'Contact Information',
    fields: ['first_name', 'last_name', 'phone_number'],
    icon: <Telephone />
  },
  {
    label: 'Address',
    fields: ['street_number', 'street_name', 'city_name', 'postcode', 'province'],
    icon: <GeoAlt />
  },
  {
    label: 'Personal Details',
    fields: ['date_of_birth', 'profile_picture_url', 'national_id'],
    icon: <PersonCircle />
  },
  {
    label: 'Additional Information',
    fields: ['employer_info', 'bank_info', 'reference_url'],
    icon: <CardChecklist />
  }
];

const UpdateUserForm = ({ userData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    street_number: '',
    street_name: '',
    city_name: '',
    postcode: '',
    province: '',
    date_of_birth: '',
    profile_picture_url: '',
    national_id: '',
    employer_info: '',
    bank_info: '',
    reference_url: '',
    ...userData 
  });
  const toFriendlyLabel = (label) => {
    return label
      .split('_') // Split the string into an array of words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // 将每个单词的首字母大写
      .join(' '); // Join the words back into a string
  };
  
  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Update user logic...
  };

  const progress = (currentStep + 1) / steps.length * 100;

  return (
    <Container>
      <ProgressBar now={progress} />
      <Form onSubmit={handleSubmit}>
        <h3>{steps[currentStep].label}</h3>
        {steps[currentStep].icon}
        {steps[currentStep].fields.map((field) => (
          <Form.Group as={Row} controlId={field} key={field}>
            <Form.Label column sm={2}>{toFriendlyLabel(field)}</Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder={toFriendlyLabel(field)}
                name={field}
                value={formData[field]}
                onChange={handleChange}
              />
            </Col>
          </Form.Group>
        ))}
        <Row className="mt-4">
          <Col>
            {currentStep > 0 && (
              <Button variant="secondary" onClick={handlePreviousStep}>
                Previous
              </Button>
            )}
          </Col>
          <Col className="text-right">
            {currentStep < steps.length - 1 ? (
              <Button variant="primary" onClick={handleNextStep}>
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
