import React, { useState, useEffect } from 'react';
import ScriptLoadContext from './ScriptLoadContext'; // Ensure correct path
import useLoadScript from '../utils/useLoadScript'; // Ensure correct path

const ScriptLoadProvider = ({ children, scriptUrl }) => {
  const [isScriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);  // Error state

  // Pass setError to useLoadScript
  useLoadScript(scriptUrl, setScriptLoaded, setError);

  const [googleMapsApi, setGoogleMapsApi] = useState({
    isScriptLoaded: false,
    googleMaps: null,
    error: null,
  });

  useEffect(() => {
    if (isScriptLoaded && !googleMapsApi.googleMaps) {
      setGoogleMapsApi({
        isScriptLoaded: true,
        googleMaps: window.google,
        error: null,
      });
    } else if (!isScriptLoaded && error) {
      setGoogleMapsApi(prevState => ({ ...prevState, error }));
    }
  }, [isScriptLoaded, error]);

  return (
    <ScriptLoadContext.Provider value={googleMapsApi}>
      {children}
    </ScriptLoadContext.Provider>
  );
};

export { ScriptLoadProvider };
