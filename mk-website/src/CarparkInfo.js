
import React from 'react';

const CarparkInfo = ({ carpark }) => {
  if (!carpark) return null; // If no carpark is selected, don't render the component

  // Render carpark information
  return (
    <div className="carpark-info">
      <h2>Carpark Information</h2>
      <p>Latitude: {carpark.lat}</p>
      <p>Longitude: {carpark.lng}</p>
      {/* Add other carpark details here */}
    </div>
  );
};

export default CarparkInfo;
