import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// Listen for unhandled promise rejections
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
});

const container = document.getElementById("root");
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
