import React, { useEffect, useRef, useContext, useState } from "react"; // Added useContext import
import ScriptLoadContext from '../context/ScriptLoadContext';
import '../styles/searchBar.css'

const SearchBar = ({ onPlaceSelect, className }) => {

  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const isScriptLoaded = useContext(ScriptLoadContext); // Use useContext to access the context value
  let autoComplete;

  useEffect(() => {
    
    if (window.google && isScriptLoaded) { // Check if script is loaded
      autoComplete = new window.google.maps.places.Autocomplete(
        autoCompleteRef.current,
        { componentRestrictions: { country: "SG" } }
      );

      autoComplete.addListener("place_changed", handlePlaceChanged);
    }

    return () => {
      if (autoComplete) {
        window.google.maps.event.clearInstanceListeners(autoComplete);
      }
    };
  }, [isScriptLoaded]);

  const handlePlaceChanged = () => {
    const addressObject = autoComplete.getPlace();
    if (addressObject.geometry) {
      const name = addressObject.name;
      const latLng = {
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      };
      setQuery(name)
      onPlaceSelect(name, latLng);
    }
  }

  return (
    <div>
      <input
        ref={autoCompleteRef}
        className={`searchBar ${className || ""} `}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default SearchBar;
