import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const ContactInfo = [
  {
    title: "Call Us",
    details: ["1 (514) 567-891", "1 (450) 987-654"],
    icon: "/phone.webp",
  },
  {
    title: "Location",
    details: ["121 Rock Street, 21 Avenue", "New York, NY 92103-9000"],
    icon: "/location.webp",
  },
  {
    title: "Hours",
    details: ["Mon - Fri: 11 am - 8 pm", "Sat, Sun: 6 am - 8 pm"],
    icon: "/hour-icon.webp",
  },
];

const ContactUsSection = () => (
  <Container fluid className="bg-secondary text-white p-5">
    <h2 className="text-center mb-4">Contact Us</h2>
    <Row>
      {ContactInfo.map((info, index) => (
        <Col md={4} key={index} className="mb-3">
          <Card className="bg-dark text-white">
            <Card.Header className="d-flex align-items-center justify-content-center">
              <img
                src={info.icon}
                alt=""
                style={{ width: "40px", height: "40px" }}
              />
            </Card.Header>
            <Card.Body>
              <Card.Title>{info.title}</Card.Title>
              {info.details.map((detail, index) => (
                <Card.Text key={index}>{detail}</Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default ContactUsSection;
