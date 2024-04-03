function deg2rad(deg) {
    return deg * (Math.PI/180);
  }
  
  //Get distance between 2 gps coordinates in KM
  function haversineDistance(loc1, loc2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(loc2.lat - loc1.lat);
    const dLon = deg2rad(loc2.lng - loc1.lng);
  
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(loc1.lat)) * Math.cos(deg2rad(loc2.lat)) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in km
  
    return distance;
  }

export default haversineDistance