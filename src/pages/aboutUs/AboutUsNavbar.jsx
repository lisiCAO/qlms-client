import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const AboutUsNavbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Container>
      <Navbar.Brand href="/">QLMS</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="/auth">Login</Nav.Link>
          <Nav.Link href="/about-us">About Us</Nav.Link>
          <Nav.Link href="#">Coming soon</Nav.Link>
          {/* Add more Nav.Link items as needed */}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default AboutUsNavbar;
