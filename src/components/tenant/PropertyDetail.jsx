import React, { useState, useEffect } from "react";
import { Carousel, Table, Badge, Container } from "react-bootstrap";
import ApiService from "../../services/ApiService";

const PropertyDetail = () => {
  const [property, setProperty] = useState(null);
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await ApiService.fetchPropertiesTenant();
        setProperty(data);
      } catch (error) {
        console.error("Error fetching Property:", error);
      }
    };

    fetchProperty();
  }, []);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        if (property && property.photos_url) {
          const response = await fetch(`${property.photos_url}`);
          const data = await response.json();
          setPhotos(data);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [property]);

  return (
    <Container fluid>
    <div>
      <h1>Property Detail</h1>

      {property ? (
        <>
          {photos.length > 0 ? (
            <Carousel>
              {photos.map((photo, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100"
                    src={photo.image_url}
                    alt={photo.description}
                  />
                  <Carousel.Caption>
                    <p>{photo.description}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>No photos available</p>
          )}

          <Table responsive="sm">
            <tbody>
              <tr>
                <td>Property Type</td>
                <td>{property.property_type}</td>
              </tr>
              {/* Continue with other property details */}
            </tbody>
          </Table>
        </>
      ) : (
        <p>No property selected</p>
      )}
    </div>
    </Container>
  );
};

export default PropertyDetail;

