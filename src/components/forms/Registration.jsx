import React, { useState } from "react";
import { useUnloadMessage } from "./../hooks/useUnloadMessage";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaUser, FaBuilding, FaWrench } from "react-icons/fa";
import Card from "react-bootstrap/Card";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ApiService from "../../services/ApiService";
import "./RoleSelection.scss";

const RoleSelection = ({ onSelectRole }) => {
  return (
    <Card className="role-selection">
      <Card.Body>
        <Card.Title>Account Type</Card.Title>
        <Card.Text>
          Choose the account type that suits your needs. Each has a different
          set of tools and features.
        </Card.Text>
        <ButtonGroup>
          <Button
            variant="outline-primary"
            onClick={() => onSelectRole("tenant")}
          >
            <FaUser className="icon" /> Tenant
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => onSelectRole("landlord")}
          >
            <FaBuilding className="icon" /> Landlord
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => onSelectRole("servicePro")}
          >
            <FaWrench className="icon" /> Service Pro
          </Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
};

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useUnloadMessage(setMessage, setSuccess);

  const navigate = useNavigate();

  const handleSelectRole = (role) => {
    setFormData({ ...formData, role });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Password complexity validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setMessage("Password does not meet complexity requirements.");
      return;
    }

    // Role validation
    if (formData.role !== "landlord" && formData.role !== "tenant") {
      setMessage("Invalid role.");
      return;
    }

    try {
      // Create user data object
      const userData = {
        email: formData.email,
        password: formData.password,
        username: formData.firstName + " " + formData.lastName, // Combine first and last name
        role: formData.role,
      };

      // Send user data to API
      const response = await ApiService.register(userData);

      console.log(response);
      setMessage("Account created successfully: " + response.username);
      navigate("/login"); // Redirect to login page
    } catch (error) {
      setMessage(error.message || "Failed to register.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      {!formData.role && <RoleSelection onSelectRole={handleSelectRole} />}
      {formData.role && (
        <Form className="form-signup" onSubmit={handleSubmit}>
          <h1 className="h3 w-100 mb-3 font-weight-normal text-center">
            Create an Account
          </h1>
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
          <Form.Group controlId="firstName" className="w-100 mb-3">
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="w-100 mb-3">
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </Form.Group>
          <Form.Group controlId="email" className="w-100 mb-3">
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
          </Form.Group>
          <Form.Group controlId="password" className="w-100 mb-3">
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group controlId="confirmPassword" className="w-100 mb-3">
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
            />
          </Form.Group>
          <Button
            type="submit"
            className="btn btn-lg btn-primary btn-block w-100"
          >
            Register
          </Button>
        </Form>
      )}
    </>
  );
};

export default Registration;
