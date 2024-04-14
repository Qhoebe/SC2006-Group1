import React from 'react';
import DistanceEntry from './distanceEntry';
import '../styles/list.css';

const DistanceList = ({ distances, onDelete, onEdit }) => {
  if (!distances) {
    // Handle the case when expenses is undefined or null
    return <div>Loading...</div>;
  }
  
  return (
    <div className="list">
      {distances.map((distance) => (
        <DistanceEntry key={distance._id} distanceRecord={distance} onDelete={onDelete} onEdit={onEdit}/>
      ))}
    </div>
  );
};

export default DistanceList;
