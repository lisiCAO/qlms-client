import React, { useState } from "react";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "./../../context/AuthContext";
import LogoutModal from "./LogoutModal";

const Topbar = () => {
  const { user, logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleShowLogoutModal = () => setShowLogoutModal(true);
  const handleCloseLogoutModal = () => setShowLogoutModal(false);

  const handleLogout = () => {
    logout();
    handleCloseLogoutModal();
  };

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="d-flex align-items-center justify-content-between p-3"
        style={{ height: "60px" }}
      >
        <Navbar.Brand as={Link} to="/landlord">
          Dashboard
        </Navbar.Brand>
        <Form inline={`${true}`} className="ml-auto d-flex align-items-center">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="link" className="d-flex align-items-center">
            <FaSearch />
          </Button>
        </Form>
        <Nav>
          <div className="d-flex align-items-center">
            <Nav.Link as={Link} to="/landlord/profile">
              {user?.username}
            </Nav.Link>
            <Button variant="link" onClick={handleShowLogoutModal}>
              <FaSignOutAlt />
            </Button>
          </div>
        </Nav>
      </Navbar>
      <LogoutModal
        show={showLogoutModal}
        handleClose={handleCloseLogoutModal}
        handleLogout={handleLogout}
      />
    </>
  );
};

export default Topbar;
