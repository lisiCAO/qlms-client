import React, { useState, useEffect } from "react";
import ApiService from "../../../services/ApiService";
import UpdateUserForm from "./UpdateUserForm";
import { useParams } from "react-router-dom";

const TenantEdit = () => {
  const { id } = useParams(); 
  const [selectedTenant, setSelectedTenant] = useState({}); 
  const [isLoading, setIsLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    setIsLoading(true); 
    ApiService.fetchUser(id)
      .then((data) => {
        setSelectedTenant(data);
        setIsLoading(false); 
      })
      .catch((error) => {
        setError("Failed to fetch tenant data"); 
        setIsLoading(false); 
      });
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>; 

  return (
    <div>
      <h1>Edit Tenant</h1>
      {selectedTenant && <UpdateUserForm userData={selectedTenant} />}
    </div>
  );
};

export default TenantEdit;

