import { createContext} from 'react';

// Initial state now includes placeholders for Google Maps services
const initialState = {
  isScriptLoaded: false,
  googleMaps: null, // This will hold the google maps object
  error: null,
};

const ScriptLoadContext = createContext(initialState);

export default ScriptLoadContext;
