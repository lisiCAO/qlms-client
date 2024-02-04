import React from "react";
import { Modal, Button } from "react-bootstrap";
const LogoutModal = ({ show, handleClose, handleLogout }) => {
  return (
    <Modal show={show} onHide={handleClose} dialogClassName="modal-custom">
      <Modal.Header closeButton className="border-bottom border-light-gray">
        <Modal.Title className="modal-title">Ready to Leave?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="border-bottom border-light-gray">
        <p>
          Select "Logout" below if you are ready to end your current session.
        </p>
      </Modal.Body>
      <Modal.Footer className="border-top border-light-gray">
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleLogout}>
          Logout
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LogoutModal;
