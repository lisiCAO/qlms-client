import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import ApiService from '../../../services/ApiService';
import { Link } from 'react-router-dom';

// const tenantsData = [
//     {
//         tenant_id: 1,
//         name: 'John Doe',
//         unit: '2B',
//         lease_start: '2024-01-01',
//         lease_end: '2024-12-31',
//         monthly_rent: 1200.00,
//         status: 'active',  
        
//     },
//     {
//         tenant_id: 2,
//         name: 'Jane Smith',
//         unit: '3A',
//         lease_start: '2024-01-01',
//         lease_end: '2024-12-31',
//         monthly_rent: 1500.00,
//         status: 'active',
//     },
//     {
//         tenant_id: 3,
//         name: 'Tom Brown',
//         unit: '1C',
//         lease_start: '2024-01-01',
//         lease_end: '2024-12-31',
//         monthly_rent: 1000.00,
//         status: 'active',
//     },
//     {
//         tenant_id: 4,
//         name: 'Alice Johnson',
//         unit: '4B',
//         lease_start: '2024-01-01',
//         lease_end: '2024-12-31',
//         monthly_rent: 1800.00,
//         status: 'active',
//     },
// ];

const TenantsList = () => {
    const [tenants, setTenants] = useState([]);  // Replace with API call

    useEffect(() => {
        // API call to fetch tenants
        // fetchTenants();
        ApiService.fetchTenants() 
        .then((data) => {
            setTenants(data);
        })
        .catch((error) => {
            console.error('Error fetching Tenants:', error);
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
                                {/* Adjust Table Name */}
                                <th>Tenant ID</th>
                                <th>Name</th>
                                <th>Unit</th>
                                <th>Lease Start</th>
                                <th>Lease End</th>
                                <th>Monthly Rent</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Iterator */}
                            {tenants.map((tenant) => (
                                <tr key={tenant.tenant_id}>
                                    <td>{tenant.tenant_id}</td>
                                    <td>{tenant.name}</td>
                                    <td>{tenant.unit}</td>
                                    <td>{tenant.lease_start}</td>
                                    <td>{tenant.lease_end}</td>
                                    <td>${tenant.monthly_rent}</td>
                                    <td>{tenant.status}</td>
                                    <td>
                                        <Link to={`/edit/${tenant.tenant_id}`} className="btn btn-primary">
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
