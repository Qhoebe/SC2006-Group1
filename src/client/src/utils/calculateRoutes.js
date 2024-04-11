function calculateRoutes(origin, destination, googleMaps, onRoutesCalculated) {
  if (!origin || !destination || !googleMaps) {
    console.error("Google Maps API is not loaded or parameters are missing");
    return;
  }

  // Use googleMaps passed as a parameter instead of window.google
  const directionsService = new googleMaps.maps.DirectionsService();

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: googleMaps.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true,
  }, (response, status) => {
    if (status === "OK") {
      const routeDetails = response.routes.map(route => ({
        summary: route.summary,
        distance: route.legs[0].distance.text,
      }));
      onRoutesCalculated(null, routeDetails);  // Pass null for error when successful
    } else {
      console.error("Directions request failed due to", status);
      onRoutesCalculated(new Error(`Directions request failed with status: ${status}`), null);
    }
  });
}

export default calculateRoutes;
