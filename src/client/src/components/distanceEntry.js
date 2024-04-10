import React from 'react';
import '../styles/distanceEntry.css'; 

function formatString(string){

  if (string.length <= 35) return string

  const str =  string.slice(0,32) + '...'

  return str
}

const DistanceEntry = ({ distanceRecord }) => {
  let { distanceTravelled, from, to, date } = distanceRecord;
  const formattedDate = new Date(date).toLocaleDateString();

  from = formatString(from)
  to = formatString(to)

  return (
    <div className="distance-entry">
      <div className="distance-distance">{distanceTravelled}KM</div>
      <div className="distance-fromAddress">From: {from}</div>
      <div className="distance-toAddress">To: {to}</div>
      <div className="distance-date">{formattedDate}</div>
    </div>
  );
};

export default DistanceEntry;