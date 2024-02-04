import React from "react";
import { Nav } from "react-bootstrap";
import "./sb-admin-2.min.css";
// Define a custom component for the nav divider
function NavDivider() {
  return (
    // Use the Nav component from react-bootstrap
    <Nav className="nav-divider">
      {/* Use a horizontal rule element with custom style */}
      <hr
        style={{
          color: "white",
          backgroundColor: "white",
          height: 1,
          width: "100%",
        }}
      />
    </Nav>
  );
}

// Export the nav divider component
export default NavDivider;
