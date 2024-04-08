import React, { useState, useEffect } from "react";
const Toast = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <div className="toast toast-top toast-end">
      <div className="alert alert-info">
        <span>{message}</span>
      </div>
      <div className="alert alert-success">
        <span>Message sent successfully.</span>
      </div>
    </div>
  );
};

export default Toast;
