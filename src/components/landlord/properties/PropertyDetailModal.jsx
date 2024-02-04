import React, { useEffect, useState } from 'react';
import { Modal, Carousel, Table, Badge, Button } from 'react-bootstrap';

const PropertyDetailModal = ({ show, onHide, property }) => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${property.photos_url}`);
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('Error fetching photos:', error);
      }
    };

    if (property && property.photos_url) {
      fetchPhotos();
    }
  }, [property]);

  return (
    <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Property Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                <tr>
                  <td>Address</td>
                  <td>{property.address}</td>
                </tr>
                <tr>
                  <td>Number of Units</td>
                  <td>{property.number_of_units}</td>
                </tr>
                <tr>
                  <td>Size</td>
                  <td>{property.size_in_sq_ft} sq ft</td>
                </tr>
                <tr>
                  <td>Year Built</td>
                  <td>{property.year_built}</td>
                </tr>
                <tr>
                  <td>Rental Price</td>
                  <td>${property.rental_price} / month</td>
                </tr>
                <tr>
                  <td>Amenities</td>
                  <td>{property.amenities}</td>
                </tr>
                <tr>
                  <td>Status</td>
                  <td>
                    <Badge bg={property.status === 'available' ? 'success' : 'secondary'}>
                      {property.status}
                    </Badge>
                  </td>
                </tr>
                <tr>
                  <td>Lease Terms</td>
                  <td>{property.lease_terms}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>{property.description}</td>
                </tr>
                {/* Display owners if available */}
                {/* You would need to fetch owner details from the property.owner_user_id */}
              </tbody>
            </Table>
          </>
        ) : (
          <p>No property selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PropertyDetailModal;
