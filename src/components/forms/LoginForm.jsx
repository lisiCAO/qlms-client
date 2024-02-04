import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useAuth } from "./../../context/AuthContext";
import { useUnloadMessage } from "./../hooks/useUnloadMessage";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const { login, user } = useAuth();

  useUnloadMessage(setMessage, setSuccess);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const credentials = { email, password };
      await login(credentials);
      setSuccess("Logged in successfully");
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } catch (error) {
      setMessage("Credentials are incorrect. Please try again!");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "landlord") {
        navigate("/landlord/properties");
      } else if (user.role === "tenant") {
        navigate("/tenant/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [user,navigate]);

  return (
    <div className="container">
      <Form onSubmit={handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Login</h1>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-100 mb-3"
        />
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-100 mb-3"
        />
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
        <Button
          type="submit"
          className="btn btn-lg btn-primary btn-block mb-3 w-100"
        >
          Sign in
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
