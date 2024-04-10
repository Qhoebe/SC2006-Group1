import { useEffect } from 'react';

const useLoadScript = (url, setScriptLoaded) => {
  useEffect(() => {
    const scriptId = 'google-maps-script';
    let scriptAddedByHook = false; // Flag to track if the script was added by this hook

    // Check if the script is already loaded
    const existingScript = document.getElementById(scriptId);
    if (existingScript) {
      setScriptLoaded(true); // Assume the script is already loaded
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = url;
      script.async = true;
      script.onload = () => setScriptLoaded(true); // Set the script as loaded on success
      script.onerror = () => {
        console.error(`Failed to load the script at ${url}`);
        setScriptLoaded(false); // Optionally, handle the load failure
      };
      document.head.appendChild(script);
      scriptAddedByHook = true; // The script was added by this hook
    }

    return () => {
      // Only remove the script if it was added by this hook
      if (scriptAddedByHook) {
        const scriptToRemove = document.getElementById(scriptId);
        if (scriptToRemove) {
          document.head.removeChild(scriptToRemove);
        }
      }
    };
  }, [url, setScriptLoaded]);
};

export default useLoadScript;
