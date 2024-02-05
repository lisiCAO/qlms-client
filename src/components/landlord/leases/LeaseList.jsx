import React, { useState, useEffect } from "react";
import { Table, Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import dayjs from "dayjs";
import ApiService from "../../../services/ApiService";
import "./LeaseList.scss";

const LeaseList = () => {
  const [leases, setLeases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedLease, setSelectedLease] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLoading(true);
    ApiService.fetchLeases()
      .then((data) => {
        setLeases(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(`Failed to fetch leases: ${error}`);
        setLoading(false);
      });
  }, []);

  const handleLeaseClick = (lease) => {
    setSelectedLease(lease);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
  };

  const renewLease = async (e, lease) => {
    e.stopPropagation();

    const startDate = dayjs(lease.start_date);
    const endDate = dayjs(lease.end_date);
    const leaseDuration = endDate.diff(startDate);
    const newEndDate = endDate.add(leaseDuration, "millisecond");

    const updatedLease = {
      ...lease,
      end_date: newEndDate.format("YYYY-MM-DD"),
    };

    try {
      await ApiService.updateLease(
        lease.lease_id,
        updatedLease
      );
      setSuccessMessage('Lease has been successfully renewed.'); 
      setShowSuccessModal(true);
      // Refresh lease list
      const data = await ApiService.fetchLeases();
      setLeases(data);
    } catch (error) {
      console.error("Failed to renew lease", error);
    }
  };

  const deleteLease = async (e, leaseId) => {
    e.stopPropagation();
    try {
      const response = await ApiService.deleteLease(leaseId);
      setSuccessMessage(response); 
      setShowSuccessModal(true);
      setLeases(leases.filter((lease) => lease.id !== leaseId));
    } catch (error) {
      console.error("Failed to delete lease:", error);
      // Show error message
    }
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredLeases = leases.filter(
    (lease) =>
      lease.property_id.toString().includes(searchTerm) ||
      lease.tenant_user_id.toString().includes(searchTerm)
  );

  if (loading) return <div>Loading leases...</div>;
  if (error) return <div>Error fetching leases: {error}</div>;

  return (
    <div>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search leases"
          aria-label="Search leases"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Table striped bordered hover className="lease-table">
        <thead>
          <tr>
            <th>Lease</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Rent Amount</th>
            <th>Payment Due Day</th>
            <th>Next Steps</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeases.map((lease) => (
            <tr key={lease.id} onClick={() => handleLeaseClick(lease)}>
              <td>{lease.property_id}</td>
              <td>{dayjs(lease.start_date).format("MM/DD/YYYY")}</td>
              <td>{dayjs(lease.end_date).format("MM/DD/YYYY")}</td>
              <td>{lease.rent_amount}</td>
              <td>{lease.payment_due_day}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    renewLease(e, lease);
                  }}
                >
                  Renew Lease
                </Button>
                <Button variant="danger"  onClick={(e) => deleteLease(e, lease.id)} style={{ marginLeft: '10px' }}>
                  End Lease
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Show lease detail modal */}
      <Modal show={showDetailModal} onHide={handleCloseDetailModal}>
        <Modal.Header closeButton>
          <Modal.Title>Lease Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLease ? (
            <div>
              <p>
                <strong>Lease ID:</strong> {selectedLease.id}
              </p>
              <p>
                <strong>Property ID:</strong> {selectedLease.property_id}
              </p>
              <p>
                <strong>Tenant User ID:</strong> {selectedLease.tenant_user_id}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {dayjs(selectedLease.start_date).format("MM/DD/YYYY")}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {dayjs(selectedLease.end_date).format("MM/DD/YYYY")}
              </p>
              <p>
                <strong>Rent Amount:</strong> $
                {parseFloat(selectedLease.rent_amount).toFixed(2)}
              </p>
              <p>
                <strong>Lease Clauses:</strong> {selectedLease.lease_clauses}
              </p>
              <p>
                <strong>Payment Due Day:</strong>{" "}
                {selectedLease.payment_due_day}
              </p>
              <p>
                <strong>Utility by Owner:</strong>{" "}
                {selectedLease.utility_by_owner}
              </p>
              <p>
                <strong>Utility by Tenant:</strong>{" "}
                {selectedLease.utility_by_tenant}
              </p>
              <p>
                <strong>Renewal Term:</strong> {selectedLease.renewal_term}
              </p>
              <p>
                <strong>Early Termination Conditions:</strong>{" "}
                {selectedLease.early_terminate_con}
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {dayjs(selectedLease.createdAt).format("MM/DD/YYYY HH:mm:ss")}
              </p>
              <p>
                <strong>Updated At:</strong>{" "}
                {dayjs(selectedLease.updatedAt).format("MM/DD/YYYY HH:mm:ss")}
              </p>
              {/* Add more lease details as needed */}
            </div>
          ) : (
            <p>No lease selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetailModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LeaseList;
