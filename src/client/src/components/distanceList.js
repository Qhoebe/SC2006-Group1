import React from 'react';
import DistanceEntry from './distanceEntry';
import '../styles/list.css';

const DistanceList = ({ distances }) => {
  return (
    <div className="list">
      {distances.map((distance) => (
        <DistanceEntry key={distance.id} distanceRecord={distance} />
      ))}
    </div>
  );
};

export default DistanceList;
