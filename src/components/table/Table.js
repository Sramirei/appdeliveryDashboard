import React, { useState } from "react";
import "./style.css";

const teamMembers = [
  {
    src: "assets/profile.jpg",
    name: "James Alexander",
    alias: "@james",
    email: "james@example.com",
    status: "active",
  },
  {
    src: "assets/liliya.jpg",
    name: "Lilia Taylor",
    alias: "@lilia",
    email: "lilia.taylor@example.com",
    status: "active",
  },
  {
    src: "assets/drew.jpg",
    name: "Drew Cano",
    email: "drew.crano@example.com",
    alias: "@drew",
    status: "inactive",
  },
  {
    src: "assets/nate.jpg",
    name: "Nate Conor",
    email: "nate@example.com",
    alias: "@nate",
    status: "offline",
  },
  {
    name: "Melissa Brantley",
    src: "assets/melissa.jpg",
    email: "melissa@example.com",
    alias: "@melissa",
    status: "active",
  },
  {
    name: "Anna Smith",
    src: "assets/anna.jpg",
    email: "anna.smith@example.com",
    alias: "@anna",
    status: "active",
  },
  {
    src: "assets/natalia.jpg",
    name: "Natalia Alexandra",
    email: "natalia@example.com",
    alias: "@natalia",
    status: "inactive",
  },
];

const columns = ["Name", "Status", "Email address"];

const itemsOnPage = 5;

const Table = () => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calcular el número total de páginas
  const numberOfPages = Math.ceil(teamMembers.length / itemsOnPage);

  // Filtrar los miembros del equipo para la página actual
  const startIndex = (currentPage - 1) * itemsOnPage;
  const currentMembers = teamMembers.slice(
    startIndex,
    startIndex + itemsOnPage
  );

  // Manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="table-widget">
      <table>
        <caption>
          Team Members{" "}
          <span className="table-row-count">
            ({teamMembers.length}) Members
          </span>
        </caption>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th> Acciones </th>
          </tr>
        </thead>
        <tbody>
          {currentMembers.map((member, index) => (
            <tr key={index}>
              <td className="team-member-profile">
                <img src={member.src} alt={member.name} />
                <span className="profile-info">
                  <span className="profile-info__name">{member.name}</span>
                  <span className="profile-info__alias">{member.alias}</span>
                </span>
              </td>
              <td>
                <span className={`status status--${member.status}`}>
                  {member.status}
                </span>
              </td>
              <td>{member.email}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length}>
              <ul className="pagination">
                {Array.from({ length: numberOfPages }, (_, i) => (
                  <li key={i}>
                    <a
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? "active" : ""}
                      title={`page ${i + 1}`}
                    >
                      {i + 1}
                    </a>
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
