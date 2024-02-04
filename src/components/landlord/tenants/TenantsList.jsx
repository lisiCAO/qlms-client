import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import ApiService from "../../../services/ApiService";
import { Link } from "react-router-dom";

const TenantsList = () => {
  const [tenants, setTenants] = useState([]);

  useEffect(() => {
    ApiService.fetchTenants()
      .then((data) => {
        const updatedTenants = data.propertiesResult.map((tenant) => {
          const leaseStartDate = new Date(tenant.lease_startDate).toISOString().split('T')[0];
          const leaseEndDate = new Date(tenant.lease_endDate).toISOString().split('T')[0];
          const leaseEnd = new Date(tenant.lease_endDate);
          const now = new Date();
          const status = leaseEnd < now ? "Inactive" : "Active";

          return {
            ...tenant,
            lease_startDate: leaseStartDate,
            lease_endDate: leaseEndDate,
            status,
          };
        });

        setTenants(updatedTenants);
      })
      .catch((error) => {
        console.error("Error fetching Tenants:", error);
      });
  }, []);

  return (
    <Container fluid>
      <h1 className="h3 mb-2 text-gray-800">List of Tenants</h1>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">Tenants</h6>
        </div>
        <div className="card-body">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Tenant ID</th>
                <th>Name</th>
                <th>Address</th> 
                <th>Lease Start</th>
                <th>Lease End</th>
                <th>Monthly Rent</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((tenant) => (
                <tr key={tenant.tenant_id}>
                  <td>{tenant.tenant_id}</td>
                  <td>{tenant.tenant_name}</td>
                  <td>{tenant.address}</td> 
                  <td>{tenant.lease_startDate}</td>
                  <td>{tenant.lease_endDate}</td>
                  <td>${tenant.monthly_rent}</td>
                  <td>{tenant.status}</td> 
                  <td>
                    <Link to={`/landlord/tenants/edit/${tenant.tenant_id}`} className="btn btn-primary">
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default TenantsList;
