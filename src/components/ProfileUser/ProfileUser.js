import React, { useState } from "react";
import "./style.css";

import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

const ProfileUser = ({ isOpen, onClose, user }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Este es un Modal</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div className="profile">
            <header className="profile__header">
              <div className="profile__highlight__wrapper">
                <div className="profile__highlight">1760</div>
                Students
              </div>
              <div className="profile__avatar">
                <img
                  src="assets/profile.jpg"
                  loading="lazy"
                  alt="Mentor profile"
                />
              </div>
            </header>
            <main>
              <div className="tabs-wrapper">
                <ul className="tabs">
                  <li className={activeTab === "tab1" ? "active" : ""}>
                    <button onClick={() => handleTabClick("tab1")}>User</button>
                  </li>
                  <li className={activeTab === "tab2" ? "" : ""}>
                    <button onClick={() => handleTabClick("tab2")}>
                      Negocio
                    </button>
                  </li>
                  {/* más tabs */}
                </ul>
              </div>
              <div
                id="tab1-content"
                className={`tab-content ${
                  activeTab === "tab1" ? "tab-content--active" : ""
                }`}
              >
                {/* Contenido del tab User */}
                <p>Contenido del tab "User"</p>
              </div>
              <div
                id="tab2-content"
                className={`tab-content ${
                  activeTab === "tab2" ? "tab-content--active" : ""
                }`}
              >
                {/* Contenido del tab Negocio */}
                <p>Contenido del tab "Negocio"</p>
              </div>
            </main>
          </div>
        </ModalBody>
        <ModalFooter>
          <a href="#" className="btn btn--primary">
            Book Mentoring
          </a>
          <Button colorScheme="blue" onClick={onClose}>
            Cerrar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProfileUser;
