import React from "react";
import "./UI/AddModal.scss";

export default function AddModal({ show, onClose, children }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        {children}
      </div>
    </div>
  );
}
