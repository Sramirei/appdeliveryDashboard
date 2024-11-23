import React from "react";
import "./productStyle.css";
import "../../style.css";

const Product = ({ session, showNotification }) => {
  return (
    <>
      <div className="projects-section">
        <div className="projects-section-header">
          <p>products</p>
          <p className="time"></p>
        </div>
      </div>
    </>
  );
};

export default Product;
