import { useEffect } from "react";

let scriptLoadingStarted = false;

const useLoadScript = (url, setScriptLoaded, setError) => {
  useEffect(() => {
    if (window.google && window.google.maps) {
      setScriptLoaded(true);
      return;
    }

    if (scriptLoadingStarted) return;
    scriptLoadingStarted = true;

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setScriptLoaded(true);
      scriptLoadingStarted = false; // Reset for potential future use
    };
    script.onerror = (error) => {
      console.error(`Failed to load the script at ${url}`, error);
      setScriptLoaded(false);
      setError(`Failed to load the script at ${url}`);
      scriptLoadingStarted = false; // Reset for potential future use
    };
    document.head.appendChild(script);
  }, [url, setScriptLoaded, setError]);
};


export default useLoadScript
