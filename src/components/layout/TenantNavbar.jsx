import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Form,
  FormControl,
  Offcanvas,
  Modal,
} from "react-bootstrap";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogoutModal from "./LogoutModal";
import { useAuth } from "./../../context/AuthContext";

const TenantNavbar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const { user, logout } = useAuth();
  const [message, setMessage] = useState(null);

  const leasePropertyId = "123";
  // TODO: Replace the above two lines with the commented line below
  const toggleLogoutModal = () => setShowLogoutModal(!showLogoutModal);
  const handleShowOffcanvas = () => setShowOffcanvas(true);
  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      setMessage("Error logging out");
    }
  };

  return (
    <>
      <Navbar bg="light" expand={false} className="mb-4 p-3">
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={handleShowOffcanvas}
        />
        <Navbar.Brand as={Link} to="/tenant/">
          Tenant Portal
        </Navbar.Brand>
        <Form inline={`${true}`} className="ml-auto d-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="link">
            <FaSearch />
          </Button>
        </Form>
        <Nav>
          <div className="d-flex align-items-center">
            <Nav.Link as={Link} to="/tenant/profile">
              {user?.username}
            </Nav.Link>
            <Button variant="link" onClick={toggleLogoutModal}>
              <FaSignOutAlt />
            </Button>
          </div>
        </Nav>
      </Navbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        style={{ backgroundColor: "rgba(0, 51, 102, 0.9)" }}
      >
        <Offcanvas.Header
          closeButton
          style={{ borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}
        >
          <Offcanvas.Title style={{ color: "white" }}>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {user?.hasLease ? (
              <>
                <Link
                  to={`/tenant/properties/${leasePropertyId}`}
                  className="nav-link"
                  style={{ color: "#fff", marginBottom: "10px" }}
                >
                  View Your Property
                </Link>
                <Link
                  to="/tenant/view-lease"
                  className="nav-link"
                  style={{ color: "#fff", marginBottom: "10px" }}
                >
                  Lease
                </Link>
              </>
            ) : (
              <Link
                to="/tenant/properties"
                className="nav-link"
                style={{ color: "#fff", marginBottom: "10px" }}
              >
                View Available Properties
              </Link>
            )}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <Modal show={message} onHide={() => setMessage(null)}>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setMessage(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <LogoutModal
        show={showLogoutModal}
        handleClose={toggleLogoutModal}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default TenantNavbar;
