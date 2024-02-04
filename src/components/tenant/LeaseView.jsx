import React from "react";
import { useState, useEffect } from "react";
import ApiService from "../../services/ApiService";
import dayjs from "dayjs";
import { Container } from "react-bootstrap";


const LeaseView = () => {
    // TODO: Implement LeaseView component logic here
    const [lease, setLease] = useState([]);

    useEffect(() => {
        // API call to fetch leases
        // fetchLeases();
        ApiService.fetchLeaseByTenant()
            .then((data) => {
                setLease(data);
            })
            .catch((error) => {
                console.error("Error fetching Lease:", error);
            });
    }, []);

    return (
        <Container fluid>
        <div>
            <h1>Lease</h1>
            <div>
                <p>
                    <strong>Lease ID:</strong> {lease.id}
                </p>
                <p>
                    <strong>Property ID:</strong> {lease.property_id}
                </p>
                <p>
                    <strong>Tenant User ID:</strong> {lease.tenant_user_id}
                </p>
                <p>
                    <strong>Start Date:</strong>{" "}
                    {dayjs(lease.start_date).format("MM/DD/YYYY")}
                </p>
                <p>
                    <strong>End Date:</strong>{" "}
                    {dayjs(lease.end_date).format("MM/DD/YYYY")}
                </p>
                <p>
                    <strong>Rent Amount:</strong> $
                    {parseFloat(lease.rent_amount).toFixed(2)}
                </p>
                <p>
                    <strong>Lease Clauses:</strong> {lease.lease_clauses}
                </p>
                <p>
                    <strong>Payment Due Day:</strong> {lease.payment_due_day}
                </p>
                <p>
                    <strong>Utility by Owner:</strong> {lease.utility_by_owner}
                </p>
                <p>
                    <strong>Utility by Tenant:</strong> {lease.utility_by_tenant}
                </p>
                <p>
                    <strong>Renewal Term:</strong> {lease.renewal_term}
                </p>
                <p>
                    <strong>Early Termination Conditions:</strong>{" "}
                    {lease.early_terminate_con}
                </p>
                <p>
                    <strong>Created At:</strong>{" "}
                    {dayjs(lease.createdAt).format("MM/DD/YYYY HH:mm:ss")}
                </p>
                <p>
                    <strong>Updated At:</strong>{" "}
                    {dayjs(lease.updatedAt).format("MM/DD/YYYY HH:mm:ss")}
                </p>

                {/* Add more lease details as needed */}
            </div>
            ) : <p>No lease selected</p>
        </div>
        </Container>
    );
};

export default LeaseView;
