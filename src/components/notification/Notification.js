import React from "react";
import "./style.css";
import { FaCheckCircle } from "react-icons/fa";
import { VscError } from "react-icons/vsc";
import { AiFillInfoCircle } from "react-icons/ai";

const Notification = ({ action = "success", message }) => {
  const renderIcon = (action) => {
    switch (action) {
      case "success":
        return <FaCheckCircle className="notification__icon" />;
      case "error":
        return <VscError className="notification__icon" />;
      case "info":
        return <AiFillInfoCircle className="notification__icon" />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`notification notification--${action}`}>
        <div className="notification__body">
          {renderIcon(action)}
          {message}
        </div>
        <div className="notification__progress"></div>
      </div>
    </>
  );
};

export default Notification;
