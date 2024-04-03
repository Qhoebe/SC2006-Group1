import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import Maps from "./Maps";

export default function Home() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, // Replace with your actual API key
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return <Maps isLoaded={isLoaded} />;
}
