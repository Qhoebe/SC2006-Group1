import React, { useContext, useRef, useEffect, useState } from 'react';
import ScriptLoadContext from '../context/ScriptLoadContext';
import '../styles/searchBar.css'

const SearchBar = ({ onPlaceSelect, className }) => {
  const { googleMaps, isScriptLoaded } = useContext(ScriptLoadContext);
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);
  let autoComplete;

  useEffect(() => {
    if (googleMaps && isScriptLoaded) {
      autoComplete = new googleMaps.maps.places.Autocomplete(
        autoCompleteRef.current,
        { componentRestrictions: { country: "SG" } }
      );
      autoComplete.addListener("place_changed", handlePlaceChanged);
    }
    return () => autoComplete && googleMaps.maps.event.clearInstanceListeners(autoComplete);
  }, [googleMaps, isScriptLoaded]);

  const handlePlaceChanged = () => {
    const addressObject = autoComplete.getPlace();
    if (addressObject.geometry) {
      setQuery(addressObject.name);
      onPlaceSelect(addressObject.name, {
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
