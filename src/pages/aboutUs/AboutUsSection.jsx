import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AboutUsSection = () => (
  <Container fluid className="bg-light p-5">
    <Row>
      <Col
        md={6}
        className="d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('/background.png')`,
          backgroundSize: "cover",
        }}
      >
        {/* Image or background */}
      </Col>
      <Col md={6}>
        <h1>About Us</h1>
        <p>
          Welcome to the Quebec Landlord Management System (QLMS), where
          innovation meets efficiency in property management. ...
        </p>
      </Col>
    </Row>
  </Container>
);

export default AboutUsSection;
