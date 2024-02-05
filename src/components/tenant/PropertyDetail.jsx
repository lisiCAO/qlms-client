import React, { useState, useEffect } from "react";
import { Carousel, Table, Container } from "react-bootstrap";
import ApiService from "../../services/ApiService";

const PropertyDetails = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await ApiService.fetchPropertiesTenant();
        setProperties(data.propertiesResult);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <Container fluid>
      <h1>Property Details</h1>
      {properties.length > 0 ? (
        properties.map((property, index) => (
          <div key={index} className="property-detail-section">
            <h2>{property.address}</h2>
            {property.image_urls && property.image_urls.length > 0 && (
              <Carousel>
                {property.image_urls.map((url, idx) => (
                  <Carousel.Item key={idx}>
                    <img className="d-block w-100" src={url} alt={`View ${idx + 1} of the property`} />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <Table responsive="sm">
              <tbody>
                <tr>
                  <td>Property Type</td>
                  <td>{property.type}</td>
                </tr>
                <tr>
                  <td>Number of Units</td>
                  <td>{property.number_of_units}</td>
                </tr>
                <tr>
                  <td>Size (sq ft)</td>
                  <td>{property.size_in_sq_ft}</td>
                </tr>
                <tr>
                  <td>Amenities</td>
                  <td>{property.amenities}</td>
                </tr>
                <tr>
                  <td>Lease Terms</td>
                  <td>{property.lease_terms}</td>
                </tr>
                <tr>
                  <td>Rental Price</td>
                  <td>${property.rental_price}</td>
                </tr>
                <tr>
                  <td>Year Built</td>
                  <td>{property.year_built}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))
      ) : (
        <p>No properties available</p>
      )}
    </Container>
  );
};

export default PropertyDetails;


