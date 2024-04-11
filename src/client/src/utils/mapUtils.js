export const addMarker = (location, map, googleMaps) => {
  if (!googleMaps || !googleMaps.maps) {
    console.error("Google Maps API is not properly loaded.");
    return;
  }

  return new googleMaps.maps.Marker({
    position: location,
    map: map,
  });
};


export const calculateAndDisplayRoute = (directionsService, directionsRenderer, markers, googleMaps, onDistanceCalculated) => {
  if (!googleMaps || !googleMaps.maps || !googleMaps.maps.TravelMode || !directionsService || !directionsRenderer) {
    console.error("Google Maps API is not fully loaded or `calculateAndDisplayRoute` was called with undefined parameters.");
    return; // Exit the function early if conditions are not met
  }
  
  if (markers.length >= 2) {
    const waypoints = markers.slice(1, -1).map(marker => ({
      location: marker.getPosition(),
      stopover: true,
    }));

    directionsService.route({
      origin: markers[0].getPosition(),
      destination: markers[markers.length - 1].getPosition(),
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: googleMaps.maps.TravelMode.DRIVING,
    }, (response, status) => {
      if (status === "OK") {
        directionsRenderer.setDirections(response);
        const totalDistance = response.routes.reduce((acc, route) => (
          acc + route.legs.reduce((legAcc, leg) => legAcc + leg.distance.value, 0)
        ), 0);
        onDistanceCalculated(totalDistance / 1000); // Convert meters to kilometers
      } else {
        window.alert("Directions request failed due to " + status);
      }
    });
  }
};
