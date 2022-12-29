import React, { useState, useEffect } from "react";
import "./index.css";
const NoInternetConnection = (props) => {
  const [isOnline, setOnline] = useState(true);

  useEffect(() => {
    setOnline(navigator.onLine);
  }, []);

  window.addEventListener("online", () => {
    setOnline(true);
  });

  window.addEventListener("offline", () => {
    setOnline(false);
  });

  if (isOnline) {
    return props.children;
  } else {
    return (
      <div className="nointernet-container">
        <h1>No Internet Connection. Please try again later.</h1>
      </div>
    );
  }
};

export default NoInternetConnection;
