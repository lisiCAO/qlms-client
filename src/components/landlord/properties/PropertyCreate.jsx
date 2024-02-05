// CreateProperty.jsx
import React, { useState } from "react";
import {
  Form,
  Button,
  ProgressBar,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { useUnloadMessage } from "./../../hooks/useUnloadMessage";
import ApiService from "./../../../services/ApiService";
import "./PropertyCreate.scss";

const propertyFormConfig = [
  {
    name: "address",
    label: "Address",
    type: "text",
    required: true,
  },
  {
    name: "number_of_units",
    label: "Number of Units",
    type: "number",
    required: true,
  },
  {
    name: "property_type",
    label: "Property Type",
    type: "select",
    options: ["apartment", "house", "condo"],
    required: true,
  },
  {
    name: "size_in_sq_ft",
    label: "Size (sq ft)",
    type: "text",
    required: true,
  },
  {
    name: "year_built",
    label: "Year Built",
    type: "text",
    required: true,
  },
  {
    name: "rental_price",
    label: "Rental Price",
    type: "text",
    required: true,
  },
  {
    name: "amenities",
    label: "Amenities",
    type: "text",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: ["available", "rented", "under_maintenance"],
    required: true,
  },
  {
    name: "lease_terms",
    label: "Lease Terms",
    type: "text",
  },
  {
    name: "images",
    label: "Image",
    type: "file",
  },
  {
    name: "description",
    label: "Description",
    type: "textarea",
  },
  // Omit 'created_at' and 'updated_at' as they are managed by the backend
];

const steps = [
  ["address", "number_of_units", "property_type"],
  ["size_in_sq_ft", "year_built", "rental_price"],
  ["amenities", "status", "lease_terms", "images", "description"],
];

const PropertyCreate = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useUnloadMessage(setMessage, setSuccess); // Display a message if the user tries to leave the page with unsaved changes

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (event.target.type === "file") {
      setFiles({ ...files, [name]: event.target.files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append text fields to the FormData object
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    // Append files to the FormData object
    for (const key in files) {
      data.append(key, files[key]);
    }

    try {
      // Send the FormData object to the backend using the API service
      const response = await ApiService.createProperty(data);
      setSuccess(`Property created successfully: ${response.address}`);
      setMessage(null);
    } catch (error) {
      setSuccess(null);
      setMessage(error.message);
    }
  };

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);
  return (
    <Container className="create-property">
      <ProgressBar now={progress} label={`${progress}%`} />
      <h1>Create Property</h1>
      <Form onSubmit={handleSubmit}>
        {steps[currentStep].map((fieldName) => {
          const field = propertyFormConfig.find((f) => f.name === fieldName);
          if (!field) {
            return null;
          }
          return (
            <Form.Group key={field.name} controlId={field.name}>
              <Form.Label>{field.label}</Form.Label>
              {field.type === "select" ? (
                <Form.Control
                  as="select"
                  name={field.name}
                  onChange={handleInputChange}
                  required={field.required}
                >
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              ) : field.type === "textarea" ? (
                <Form.Control
                  as="textarea"
                  name={field.name}
                  onChange={handleInputChange}
                  rows={3}
                />
              ) : field.type === "file" ? ( 
                <Form.Control
                  type="file"
                  name={field.name}
                  onChange={handleInputChange}
                />
              ) : (
                <Form.Control
                  type={field.type}
                  name={field.name}
                  onChange={handleInputChange}
                  required={field.required}
                />
              )}
            </Form.Group>
          );
        })}
        <Row>
          <Col>
            {currentStep > 0 && (
              <Button
                variant="secondary"
                type="button"
                onClick={handlePreviousStep}
              >
                Previous
              </Button>
            )}
          </Col>
          <Col>
            {currentStep < steps.length - 1 ? (
              <Button
                variant="secondary"
                type="button"
                onClick={handleNextStep}
              >
                Next
              </Button>
            ) : (
              <Button variant="primary" type="submit">
                Submit
              </Button>
            )}
          </Col>
        </Row>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}
      </Form>
    </Container>
  );
};

export default PropertyCreate;
