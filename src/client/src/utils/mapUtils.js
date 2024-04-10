// mapUtils.js
export const addMarker = (location, map) => {
  return new window.google.maps.Marker({
    position: location,
    map: map,
  });
};

export const calculateAndDisplayRoute = (directionsService, directionsRenderer, markers, onDistanceCalculated) => {
  
  const waypoints = markers.slice(1, markers.length - 1).map(marker => ({
      location: marker.getPosition(),
      stopover: true,
    }));
  
    if (markers.length >= 2) {
      directionsService.route(
        {
          origin: markers[0].getPosition(),
          destination: markers[markers.length - 1].getPosition(),
          waypoints: waypoints,
          optimizeWaypoints: true,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK") {
            directionsRenderer.setDirections(response);
            const totalDistance = response.routes.reduce((acc, route) => {
              return acc + route.legs.reduce((legAcc, leg) => legAcc + leg.distance.value, 0);
            }, 0);
            onDistanceCalculated(totalDistance/1000); 
          } else {
            window.alert("Directions request failed due to " + status);
          }
        }
      );
    }
};
