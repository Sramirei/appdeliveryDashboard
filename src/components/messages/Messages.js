import React, { useState } from "react";
import "./messages.css";
const Messages = () => {
  // Estados para las reacciones
  const [reactions, setReactions] = useState({
    love: 15,
    super: 8,
    normal: 5,
    dislike: 2,
  });

  const handleReaction = (type) => {
    setReactions((prevReactions) => ({
      ...prevReactions,
      [type]: prevReactions[type] + 1,
    }));
  };

  return (
    <>
      <div className="projects-section-header">
        <p>Mis publicaciones</p>
      </div>
      <div className="messages">
        <div className="publication-box">
          <img
            className="publication-image"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
            alt="Imagen de publicación"
          />
          <div className="publication-content">
            {/* Encabezado */}
            <div className="publication-header">
              <h4 className="publication-title">Título de la publicación</h4>
              <p className="publication-description">
                Esta es la descripción breve de la publicación.
              </p>
            </div>
            {/* Interacciones */}
            <div className="publication-reactions">
              <button
                onClick={() => handleReaction("love")}
                className="reaction"
              >
                ❤️  <span className="reaction-count">{reactions.love}</span>
              </button>
              <button
                onClick={() => handleReaction("super")}
                className="reaction"
              >
                🔥  <span className="reaction-count">{reactions.super}</span>
              </button>
              <button
                onClick={() => handleReaction("normal")}
                className="reaction"
              >
                😐  <span className="reaction-count">{reactions.normal}</span>
              </button>
              <button
                onClick={() => handleReaction("dislike")}
                className="reaction"
              >
                👎<span className="reaction-count">{reactions.dislike}</span>
              </button>
            </div>
          </div>
        </div>
        <div className="publication-box">
          <img
            className="publication-image"
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
            alt="Imagen de publicación"
          />
          <div className="publication-content">
            {/* Encabezado */}
            <div className="publication-header">
              <h4 className="publication-title">Título de la publicación</h4>
              <p className="publication-description">
                Esta es la descripción breve de la publicación.
              </p>
            </div>
            {/* Interacciones */}
            <div className="publication-reactions">
              <button
                onClick={() => handleReaction("love")}
                className="reaction"
              >
                ❤️  <span className="reaction-count">{reactions.love}</span>
              </button>
              <button
                onClick={() => handleReaction("super")}
                className="reaction"
              >
                🔥  <span className="reaction-count">{reactions.super}</span>
              </button>
              <button
                onClick={() => handleReaction("normal")}
                className="reaction"
              >
                😐  <span className="reaction-count">{reactions.normal}</span>
              </button>
              <button
                onClick={() => handleReaction("dislike")}
                className="reaction"
              >
                👎<span className="reaction-count">{reactions.dislike}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
