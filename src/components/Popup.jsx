import React from "react";
import "../styles/popup.css";

const Popup = ({ showPopup, setShowPopup, onSubmit }) => {
  const [milkQuantity, setMilkQuantity] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleSubmit = () => {
    if (validateMilkQuantity()) {
      onSubmit(milkQuantity);
      setShowPopup(false);
      setErrorMessage(""); 
    } else {
      setErrorMessage("* Please enter a valid milk quantity");
    }
  };

  const validateMilkQuantity = () => {
    const numberRegex = /^\d+(\.\d+)?$/;
    return numberRegex.test(milkQuantity);
  };

  return (
    showPopup && (
      <div className="popup-container">
        <div className="popup">
          <h2>Enter Milk Quantity</h2>
          <input
            type="text"
            value={milkQuantity}
            onChange={(e) => setMilkQuantity(e.target.value)}
            placeholder="Enter milk quantity (in liters)"
            required
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="popup-buttons">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default Popup;
