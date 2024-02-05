import React, { useState } from "react";
import ApiService from "../../services/ApiService";
import { Form, Button, Container } from "react-bootstrap";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await ApiService.forgotPassword({ email });
  
      if (response.success === false) {
        setMessage(response.message);
        setSuccess(false);
        return;
      }
        setSuccess(response.message);
        setMessage(null);
    } catch (error) {
      setMessage("Error resetting password");
      setSuccess(false);
    }
  };

  return (
    <Container>
      <Form className="form-forgot-password" onSubmit={handleResetPassword}>
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Forgot Password
        </h1>
        <Form.Group controlId="email" className="w-100 mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-3">
          Reset Password
        </Button>
      </Form>
      {message && <p className="text-danger text-center">{message}</p>}
      {success && <p className="text-success text-center">{success}</p>}
    </Container>
  );
};

export default ForgotPassword;
