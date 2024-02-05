import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Modal } from "react-bootstrap";
import {
  House,
  Briefcase,
  People,
  PlusCircle,
  PersonCircle,
} from "react-bootstrap-icons";
import Image from "react-bootstrap/Image";
import Nav from "react-bootstrap/Nav";
import { useAuth } from "../../context/AuthContext";
import "./Sidebar.scss";

const LogoImage = process.env.PUBLIC_URL + "/logo.png";

const Sidebar = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState("Guest");
  const [profileImage, setProfileImage] = useState("");
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setProfileImage(user.profile_picture_url);
    }
  }, [user]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="sidebar d-flex flex-column align-items-center justify-content-center">
      <div className="d-flex flex-column align-items-center justify-content-center">
        <div className="sidebar-logo my-3">
          <Image
            src={LogoImage}
            roundedCircle
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        {/* Create New Button */}
        <Button variant="primary" className="mb-3" onClick={handleOpenModal}>
          <PlusCircle className="me-2" />
          Create New
        </Button>
        <hr />
      </div>
      <Accordion defaultActiveKey="0" className="w-100">
        {/* Properties */}
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <House className="icon" />
            Properties
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/landlord/properties" className="d-block">
                Overview
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/landlord/properties/create"
                className="d-block"
              >
                Create
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        {/* Leases */}
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            <Briefcase className="icon" /> Leases
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/landlord/leases" className="d-block">
                Overview
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/landlord/leases/create"
                className="d-block"
              >
                Create
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>

        {/* Tenants */}
        <Accordion.Item eventKey="2">
          <Accordion.Header>
            <People className="icon" /> Tenants
          </Accordion.Header>
          <Accordion.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/landlord/tenants" className="d-block">
                Overview
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/landlord/tenants/create"
                className="d-block"
              >
                Coming soon
              </Nav.Link>
            </Nav>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* User Information at the Bottom */}
      <div className="sidebar-footer mt-auto mb-3 text-center">
        {profileImage ? (
          <Image
            src={profileImage}
            roundedCircle
            style={{ width: "50px", height: "50px" }}
          />
        ) : (
          <PersonCircle size={50} className="user-icon" />
        )}
        <div className="user-name">{username}</div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Create New</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/landlord/properties/create"
              className="d-block"
            >
              <House className="icon" />
              Property
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/landlord/leases/create"
              className="d-block"
            >
              <Briefcase className="icon" />
              Lease
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/landlord/tenants/create"
              className="d-block"
            >
              <People className="icon" />
              Tenant
            </Nav.Link>
          </Nav>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Sidebar;
