// RouteButton.js
import React from "react";

const RouteButton = ({ origin, destination }) => {
  if (!origin || !destination) return null; // Don't render if we don't have the necessary data

  const handleRouteClick = () => {
    const originParam = `origin=${origin.lat},${origin.lng}`;
    const destinationParam = `destination=${destination.lat},${destination.lng}`;
    const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&${originParam}&${destinationParam}`;
    window.open(googleMapsDirectionsUrl, "_blank");
  };

  return (
    <button onClick={handleRouteClick} className="route-button">
      Route
    </button>
  );
};

export default RouteButton;