import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./services/ProtectedRoute";

import TenantLayout from "./pages/tenant/TenantLayout";
import TenantDashboard from "./components/tenant/TenantDashboard";
import PropertyGeneralList from "./components/tenant/PropertyGeneralList";
import PropertyDetail from "./components/tenant/PropertyDetail";
import LeaseApplication from "./components/tenant/LeaseApplication";
import TenantProfile from "./pages/tenant/TenantProfile";

import LandlordLayout from "./pages/landlord/LandlordLayout";
import PropertyPage from "./pages/landlord/property/PropertyPage";
import LeasePage from "./pages/landlord/lease/LeasePage";
import LandlordTenantPage from "./pages/landlord/tenant/LandlordTenantPage";
import CheckAuth from "./services/CheckAuth";

import AboutUs from "./pages/AboutUsPage";
import LandlordDashBoard from "./pages/landlord/LandlordDashboard"
import LandlordProfile from "./pages/landlord/LandlordProfile";
import LeaseView from "./components/tenant/LeaseView";

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth routes */}
        <Route path="/" element={<CheckAuth />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/auth/:view" element={<AuthPage />} />
        {/* Tenant routes */}
        <Route element={<ProtectedRoute role="tenant" />}>
          <Route path="/tenant/*" element={<TenantLayout />}>
            <Route index element={<TenantDashboard />} />
            <Route path="/tenant/dashboard" element={<TenantDashboard />} />
            <Route path="properties" element={<PropertyGeneralList />} />
            <Route path="properties/:id" element={<PropertyDetail />} />
            <Route path="apply-lease" element={<LeaseApplication />} />
            <Route path="view-lease" element={<LeaseView />} />
            <Route path="profile" element={<TenantProfile />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Route>
        {/* Landlord routes */}
        <Route element={<ProtectedRoute role="landlord" />}>
          <Route path="/landlord/*" element={<LandlordLayout />}>
            <Route index element={<LandlordDashBoard />} />
            <Route path="/landlord/dashboard" element={<LandlordDashBoard />} />
            <Route path="properties/*" element={<PropertyPage />} />
            <Route path="leases/*" element={<LeasePage />} />
            <Route path="tenants/*" element={<LandlordTenantPage />} />
            <Route path="profile" element={<LandlordProfile />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Route>
        <Route path="/about-us" element={<AboutUs />} />

        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}


export default App;