import React, { useState } from "react";
import { Form, Button, Col, Row, Container, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";

const LeaseCreate = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const propertyId = searchParams.get("propertyId") || "";  // 如果没有propertyId，则默认为空字符串
  const [lease, setLease] = useState({
    property_id: propertyId,  // 使用propertyId初始化，即使它是空字符串
    tenant_user_id: "",
    start_date: new Date(),
    end_date: new Date(),
    rent_amount: "",
    lease_clauses: "",
    payment_due_day: "",
    utility_by_owner: "",
    utility_by_tenant: "",
    renewal_term: "",
    early_terminate_con: "",
  });
  const [dateError, setDateError] = useState("");
  const [validated, setValidated] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setLease((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateChange = (fieldName, date) => {
    setLease((prevState) => ({
      ...prevState,
      [fieldName]: date,
    }));

    if (fieldName === "start_date" && date > lease.end_date) {
      setDateError("Start date cannot be later than end date.");
    } else if (fieldName === "end_date" && date < lease.start_date) {
      setDateError("End date cannot be earlier than start date.");
    } else {
      setDateError(""); // Clear error message
    }
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    setValidated(true);

    if (form.checkValidity() === false || dateError) {
      e.stopPropagation();
    } else {
      console.log(lease);
      // Submit logic here
    }

    try {
      // Send the FormData object to the backend using the API service
      const response = await ApiService.createLease(lease);
      // TODO: Handle the response
      console.log("response:", response);
      //setMessage(response.message);
      // Handle success
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container fluid>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="property_id">
            <Form.Label>Property ID</Form.Label>
            <Form.Control
              required
              type="number"
              name="property_id"
              value={lease.property_id}
              onChange={handleChange}
              min="1"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Property ID.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} controlId="tenant_user_id">
            <Form.Label>Tenant User ID</Form.Label>
            <Form.Control
              required
              name="tenant_user_id"
              value={lease.tenant_user_id}
              onChange={handleChange}
              min="1"
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Tenant User ID.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        {/* Date Pickers for Start and End Date with Validation */}
        <Row className="mb-3">
          <Col>
            <Form.Label>Start Date</Form.Label>
            <DatePicker
              selected={lease.start_date}
              onChange={(date) => handleDateChange("start_date", date)}
              className="form-control"
            />
          </Col>
          <Col>
            <Form.Label>End Date</Form.Label>
            <DatePicker
              selected={lease.end_date}
              onChange={(date) => handleDateChange("end_date", date)}
              className="form-control"
            />
          </Col>
        </Row>

        {/* Rent Amount  */}
        <Form.Group className="mb-3" controlId="rent_amount">
          <Form.Label>Rent Amount</Form.Label>
          <Form.Control
            required
            name="rent_amount"
            value={lease.rent_amount}
            onChange={handleChange}
            min="1"
            max="31"
          />
          <Form.Control.Feedback type="invalid">
            Rent amount must be a decimal number.
          </Form.Control.Feedback>
        </Form.Group>

        {/* Payment Due Day */}
        <Form.Group className="mb-3" controlId="payment_due_day">
          <Form.Label>Payment Due Day</Form.Label>
          <Form.Control
            required
            type="number"
            name="payment_due_day"
            value={lease.payment_due_day}
            onChange={handleChange}
            min="1"
            max="31"
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid day of the month (1-31).
          </Form.Control.Feedback>
        </Form.Group>

        {/* Utility Responsibility Fields */}
        <Form.Group className="mb-3" controlId="utility_by_owner">
          <Form.Label>Utilities by Owner</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="utility_by_owner"
            value={lease.utility_by_owner}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="utility_by_tenant">
          <Form.Label>Utilities by Tenant</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="utility_by_tenant"
            value={lease.utility_by_tenant}
            onChange={handleChange}
          />
        </Form.Group>

        {/* Renewal Term and Early Termination Conditions */}
        <Form.Group className="mb-3" controlId="renewal_term">
          <Form.Label>Renewal Term</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="renewal_term"
            value={lease.renewal_term}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="early_terminate_con">
          <Form.Label>Early Termination Conditions</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="early_terminate_con"
            value={lease.early_terminate_con}
            onChange={handleChange}
          />
        </Form.Group>
        {dateError && (
          <Row>
            <Col>
              <Alert variant="danger">{dateError}</Alert>
            </Col>
          </Row>
        )}
        <Row>
          <Col>
            <Button variant="primary" type="submit">
              Create Lease
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default LeaseCreate;
