import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./PropertyList.scss";
import ApiService from "../../../services/ApiService";
import PropertyDetailModal from "./PropertyDetailModal";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    console.log("Selected Property:", property);
    setShowDetailModal(true);
  };

  const handleApplyClick = (e, property) => {
    e.stopPropagation(); // Stop event propagation to prevent triggering the card click event
    // Add logic for applying for leasing here, if needed
    console.log("Apply for leasing:", property);
  };

  useEffect(() => {
    let isMounted = true; // Component is mounted

    ApiService.fetchProperties()
      .then((data) => {
        if (isMounted) {
          setProperties(data);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching properties:", error);
        if (isMounted) {
          setMessage("Failed to fetch properties.");

          setLoading(false);
        }
      });

    return () => {
      isMounted = false; // Component is unmounted
    };
  }, []);

  if (loading) return <div>Loading properties...</div>;
  if (message) return <div>Error fetching properties: {message}</div>;

  return (
    <div className="properties-list">
      {properties.map((property) => (
        <Card key={property.id} className={`property-card mb-3 ${selectedProperty?.id === property.id ? "selected-card" : ""}`} onClick={() => handlePropertyClick(property)}>
          <Card.Img
            variant="top"
            src={
              property.image_urls ? property.image_urls[0] : "default-image-url"
            }
          />
          <Card.Body>
            <Card.Title>{property.address}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {property.property_type} - {property.size_in_sq_ft} sq ft
            </Card.Subtitle>
            <Card.Text>
              {property.description}
              <br />
              Units: {property.number_of_units} | Built in:{" "}
              {property.year_built}
              <br />
              Rental Price: ${property.rental_price} / month
              <br />
              Amenities: {property.amenities}
              <br />
              Status: {property.status}
              <br />
              Lease Terms: {property.lease_terms}
            </Card.Text>
            <Button
              variant="primary"
              disabled={property.status !== "available"}
              onClick={(e) => handleApplyClick(e, property)}
            >
              Apply For Leasing
            </Button>
            {/* Removed View Details Button */
          </Card.Body>
        </Card>
      ))}
      <PropertyDetailModal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        property={selectedProperty}
      />
    </div>
  );
};

export default PropertyList;
