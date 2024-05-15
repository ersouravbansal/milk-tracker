import React from "react";
import "../styles/progress-bar.css";

const ProgressBar = ({ currentTime, duration }) => {
  const calculateProgress = () => {
    return (currentTime / duration) * 100;
  };

  return (
    <div className="progress-container">
      <div className="progress-bar" style={{ width: `${calculateProgress()}%` }}></div>
    </div>
  );
};

export default ProgressBar;
