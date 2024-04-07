import React from 'react';
import DistanceList from './distanceList'; 
import '../styles/container.css'; 

// Dummy data - replace this with actual data, perhaps fetched from an API
const distance = [
    { id: 1, distanceTravelled: 10, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University SCSE', date: "2024-04-01" },
    { id: 2, distanceTravelled: 20, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 3, distanceTravelled: 30, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 4, distanceTravelled: 40, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 5, distanceTravelled: 50, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 6, distanceTravelled: 60, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 7, distanceTravelled: 70, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" },
    { id: 8, distanceTravelled: 80, from: 'Blk 356 Hougang Avenue 7', to: 'Nanyang Technological University', date: "2024-04-01" }
  ];
  

const DistanceContainer = () => {
  return (
    <div className="container">
      <header className="container-header">
        DISTANCE
      </header>
      <DistanceList distances={distance} />
    </div>
  );
};

export default DistanceContainer;