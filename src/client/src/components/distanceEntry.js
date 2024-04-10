import React, { useState } from 'react';
import '../styles/entry.css'; 


const DistanceEntry = ({ distanceRecord, onDelete, onEdit}) => {
  let { distanceTravelled, from, to, date } = distanceRecord;
  const formattedDate = new Date(date).toLocaleDateString();

  // State to track hover state
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="entry"
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}>
      <div className = "entry-row1" >
        <div className="entry-title" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {distanceTravelled}KM
        </div>
        <div className="entry-date" style={{ opacity: isHovered ? 0.5 : 1 }}>
          {formattedDate}
        </div>
      </div>
      <div>
        <div className="entry-details" style={{ opacity: isHovered ? 0.5 : 1 }}>From: {from}</div>
        <div className="entry-details" style={{ opacity: isHovered ? 0.5 : 1 }}>To: {to}</div>
      </div>
      {isHovered && (
          <div className="entry-actions">
          <img
            className="delete-btn"
            src="/icons/delete.png"
            alt="Delete"
            onClick={() => onDelete(distanceRecord)}
            style={{ width: '30px', height: '30px' }}
          />
          </div>
        )}
    </div>
  );
};

export default DistanceEntry;