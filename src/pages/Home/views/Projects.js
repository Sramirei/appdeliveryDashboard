import React from "react";
import "../style.css";

export const Projects = () => {
  return (
    <>
      <div className="projects-section">
        {/* Header */}
        <div className="projects-section-header">
          <p>Projects</p>
          <p className="time">December, 12</p>
        </div>
        {/* Informacion o datos */}
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">45</span>
              <span className="status-type">In Progress</span>
            </div>
            <div className="item-status">
              <span className="status-number">24</span>
              <span className="status-type">Upcoming</span>
            </div>
            <div className="item-status">
              <span className="status-number">62</span>
              <span className="status-type">Total Projects</span>
            </div>
          </div>
          <div className="view-actions">
            <button className="view-btn list-view" title="List View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-list"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            <button className="view-btn grid-view active" title="Grid View">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-grid"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
          </div>
        </div>

        {/* contenido jsGridView 👉 para usar cuadricula o jsListView 👉 para usar Listas */}
        <div className="project-boxes jsGridView">
          {/* la clase project-box-wrapper es para crear los items dentro del contenedor (las cajitas o las listas) */}
          <div className="project-box-wrapper">
            {/* esta es el elemnto (cajita) no cambiar las clases! */}
            <div className="project-box" style={{ backgroundColor: "#fee4cb" }}>
              {/* Header de la cajita */}
              <div className="project-box-header">
                <span>December 10, 2020</span>
                <div className="more-wrapper">
                  <button className="project-btn-more">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="feather feather-more-vertical"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>
                </div>
              </div>
              {/* contenido de la cajita */}
              <div className="project-box-content-header">
                <p className="box-content-header">Web Designing</p>
                <p className="box-content-subheader">Prototyping</p>
              </div>
              <div className="box-progress-wrapper">
                <p className="box-progress-header">Progress</p>
                <div className="box-progress-bar">
                  <span
                    className="box-progress"
                    style={{ width: "60;", backgroundColor: "#ff942e" }}
                  ></span>
                </div>
                <p class="box-progress-percentage">60%</p>
              </div>
              {/* footer de la cajita */}
              <div class="project-box-footer">
                <div class="participants">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                    alt="participant"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fG1hbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="participant"
                  />
                  <button class="add-participant" style={{ color: "#ff942e" }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-plus"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
                <div class="days-left" style={{ color: "#ff942e" }}>
                  2 Days Left
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
