// LandlordTenantPage.js
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import TenantsList from "./../../../components/landlord/tenants/TenantsList";
// import TenantCreate from "./../../../components/landlord/tenants/TenantCreate"; {* We don't need this option because we are not creating a new tenant here. *}
import TenantEdit from "./../../../components/landlord/tenants/TenantEdit";
import TenantDelete from "./../../../components/landlord/tenants/TenantDelete";

const LandlordTenantPage = () => {
  return (
    <div>
      <Routes>
        <Route index element={<TenantsList />} />
        {/* <Route path="create" element={<TenantCreate />} /> */}
        <Route path="edit/:id" element={<TenantEdit />} />
        <Route path="delete/:id" element={<TenantDelete />} />
      </Routes>
      <Outlet /> 
    </div>
  );
};

export default LandlordTenantPage;
