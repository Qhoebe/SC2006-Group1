import React, { useContext, useEffect, useRef } from 'react';
import ScriptLoadContext from '../context/ScriptLoadContext';
import '../styles/mapComponent.css';

const Map = ({ className, onMapLoad }) => {  // Include onMapLoad in the component props
  
  const { isScriptLoaded } = useContext(ScriptLoadContext);
  const mapContainerRef = useRef(null);
  const isMapInitialized = useRef(false);

  const darkModeStyles = [
    { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263c3f" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6b9a76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414e" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212a37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9ca5b3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1f2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#f3d19c" }],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [{ color: "#2f3948" }],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [{ color: "#d59563" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263c" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515c6d" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263c" }],
    },
  ]

  useEffect(() => {
    if (isScriptLoaded && !isMapInitialized.current && window.google) { // Added window.google check for safety
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 1.350270, lng: 103.832959 },
        zoom: 11.8,
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: darkModeStyles,
      });
      isMapInitialized.current = true;
      
      if (onMapLoad) {
        onMapLoad(map);  // Call the onMapLoad callback, passing the map instance
      }
    }
  }, [isScriptLoaded, onMapLoad]);  // Include onMapLoad in the dependency array
  

  return (
    <div>
      {isScriptLoaded ? (
        <div ref={mapContainerRef} className={`mapComponent ${className || ' '}`} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Map;