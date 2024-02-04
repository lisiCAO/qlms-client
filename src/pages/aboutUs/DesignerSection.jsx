import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const designers = [
  { name: "CAO, Lisi", role: "UI/UX Designer", image: "/developer4.webp" },
  { name: "TANG, Shixin", role: "Algorithm Designer", image: "/developer1.webp" },
  { name: "LI, Zhi", role: "Graphic Designer", image: "/developer2.webp" },
];

const DesignerSection = () => (
  <Container className="my-5">
    <h2 className="text-center mb-4">Meet Our Designers</h2>
    <Row>
      {designers.map((designer, index) => (
        <Col md={4} key={index}>
          <Card className="mb-4">
            <Card.Img variant="top" src={designer.image} />
            <Card.Body>
              <Card.Title>{designer.name}</Card.Title>
              <Card.Text>{designer.role}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default DesignerSection;
