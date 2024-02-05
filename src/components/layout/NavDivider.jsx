import React from "react";
import { Nav } from "react-bootstrap";
import "./sb-admin-2.min.css";

function NavDivider() {
  return (
    <Nav className="nav-divider">
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

export default NavDivider;
