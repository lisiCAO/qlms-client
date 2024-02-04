import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LeaseList from "./../../../components/landlord/leases/LeaseList";
import LeaseCreate from "./../../../components/landlord/leases/LeaseCreate";
// import LeaseEdit from "./../../../components/landlord/leases/LeaseEdit";
import LeaseDelete from "./../../../components/landlord/leases/LeaseDelete";

const LeasePage = () => {
  return (
    <div>
      <Routes>
        <Route index element={<LeaseList />} />
        <Route path="create" element={<LeaseCreate />} />
        {/* <Route path="edit/:id" element={<LeaseEdit />} /> We would not offer edit option */}
        <Route path="delete/:id" element={<LeaseDelete />} /> 
      </Routes>
    </div>
  );
};

export default LeasePage;
