import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import PropertyList from "./../../.././components/landlord/properties/PropertyList";
import PropertyCreate from "./../../.././components/landlord/properties/PropertyCreate";
import PropertyEdit from "./../../.././components/landlord/properties/PropertyEdit";
import PropertyDelete from "./../../.././components/landlord/properties/PropertyDelete";

const PropertyPage = () => {
  return (
    <div>
      <Routes>
        <Route index element={<PropertyList />} />
        <Route path="create" element={<PropertyCreate />} />
        <Route path="edit/:id" element={<PropertyEdit />} />
        <Route path="delete/:id" element={<PropertyDelete />} />
      </Routes>
      <Outlet /> {/* Render the nested child routes */}
    </div>
  );
};

export default PropertyPage;
