import React, { useContext, useRef, useEffect, useState } from 'react';
import ScriptLoadContext from '../context/ScriptLoadContext';
import '../styles/searchBar.css';

const SearchBar = ({ onPlaceSelect, className }) => {
  const { googleMaps, isScriptLoaded } = useContext(ScriptLoadContext);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  const autoCompleteInstance = useRef(null);

  useEffect(() => {
    if (isScriptLoaded && !autoCompleteInstance.current) {
      const initAutocomplete = () => {
        if (window.google && window.google.maps && window.google.maps.places) {
          try {
            autoCompleteInstance.current = new window.google.maps.places.Autocomplete(
              autoCompleteRef.current,
              { componentRestrictions: { country: "SG" } }
            );
            autoCompleteInstance.current.addListener("place_changed", handlePlaceChanged);
          } catch (error) {
            console.error("Autocomplete initialization failed:", error);
          }
        } else {
          setTimeout(initAutocomplete, 2000); // Retry after 500ms
        }
      };
  
      initAutocomplete();
    }
  }, [googleMaps, isScriptLoaded, autoCompleteInstance]); // Ensure dependencies are correctly listed

  const handlePlaceChanged = () => {
    if (!autoCompleteInstance.current) return;
    const addressObject = autoCompleteInstance.current.getPlace();
    if (addressObject && addressObject.geometry) {
      const name = addressObject.name || addressObject.formatted_address ;
      setQuery(name);
      onPlaceSelect(name, {
        lat: addressObject.geometry.location.lat(),
        lng: addressObject.geometry.location.lng(),
      });
    }
  };

  return (
    <div>
      <input
        ref={autoCompleteRef}
        className={`searchBar ${className || ""}`}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search Places ..."
        value={query}
      />
    </div>
  );
};

export default SearchBar;
