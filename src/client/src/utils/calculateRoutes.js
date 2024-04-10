function calculateRoutes(origin, destination, onRoutesCalculated) {
  if (!origin || !destination || !window.google) {
    console.error("Google Maps API is not loaded or parameters are missing");
    return;
  }

  const directionsService = new window.google.maps.DirectionsService();

  directionsService.route({
    origin: origin,
    destination: destination,
    travelMode: window.google.maps.TravelMode.DRIVING,
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
      // Pass an Error object to the callback
      onRoutesCalculated(new Error(`Directions request failed with status: ${status}`), null);
    }
  });
}


export default calculateRoutes;
