import React, { useEffect, useState } from "react";
import "../styles/milk-history.css";

const MilkHistory = () => {
  const [milkingHistory, setMilkingHistory] = useState([]);
  // const formatTime = (totalSeconds) => {
  //   const hours = Math.floor(totalSeconds / 3600);
  //   const minutes = Math.floor((totalSeconds % 3600) / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${hours.toString().padStart(2, "0")}h: ${minutes.toString().padStart(2, "0")}m: ${seconds.toString().padStart(2, "0")}s`;
  // };

  useEffect(() => {
    const storedMilkingHistory = JSON.parse(localStorage.getItem("milkingHistory")) || [];
    setMilkingHistory(storedMilkingHistory);
  }, []);

  return (
    <div className="milk-history-container">
      <h2>Milk History</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Total Time</th>
              <th>Total Milk (liters)</th>
            </tr>
          </thead>
          <tbody>
            {milkingHistory.map((session, index) => (
              <tr key={index}>
                <td>{new Date(session.date).toLocaleDateString()}</td>
                <td>{new Date(session.startTime).toLocaleTimeString()}</td>
                <td>{new Date(session.endTime).toLocaleTimeString()}</td>
                <td>{session.totalMilkingTime} </td>
                <td>{session.milkQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MilkHistory;
