import React from 'react';
import ApiService from './../../../services/ApiService';

const PropertyComponent = ({ id }) => {
    const handleDelete = () => {
        ApiService.deleteProperty(id)
            .then(() => {
                console.log('Property deleted');
            })
            .catch((error) => {
                console.error('Error deleting property:', error);
            });
    };

    return (
        <div>
            <h1>Property Component</h1>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
};

export default PropertyComponent;