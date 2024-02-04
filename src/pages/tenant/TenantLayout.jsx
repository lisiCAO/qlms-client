import React from "react";
import TenantNavbar from "./../../components/layout/TenantNavbar";
import { Outlet } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const TenantLayout = () => {
  return (
    <div className="tenant-layout">
      <TenantNavbar />
      <div className="tenant-content">
        <Container fluid className="p-4 pt-5">
          <Row className="justify-content-center">
            <Col lg={10} xl={8}>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TenantLayout;
