/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect, useContext } from "react";
import "./style.css";
import UserContext from "../../context/userContext";
import { Navigate } from "react-router-dom";

import Notification from "../../components/notification/Notification";
import Orders from "./views/Orders";

const Home = ({ session }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState({
    action: "success",
    message: "",
    visible: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const [userData, setUserData] = useState({});

  const notificationBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const profileRef = useRef(null);

  const { handleLogout } = useContext(UserContext);

  // component change
  const handleSideBarClick = (component) => {
    setSelectedComponent(component);
  };

  const openMessages = () => {
    setShowMessages(true);
  };

  const openMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeMessages = () => {
    setShowMessages(false);
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const toggleUserMenu = () => {
    setUserMenuVisible((prev) => !prev);
  };

  const changeDarkMode = () => {
    const modeSwitch = document.querySelector(".mode-switch");

    const handleModeSwitch = () => {
      document.documentElement.classList.toggle("dark");
      modeSwitch.classList.toggle("active");
    };

    modeSwitch?.addEventListener("click", handleModeSwitch);

    return () => {
      modeSwitch?.removeEventListener("click", handleModeSwitch);
    };
  };

  // para mostrar la notificacion ( action = susses, error, info - message (mensaje que se va a mostrar))
  const showNotification = (action, message) => {
    setNotification({ action, message, visible: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !notificationBtnRef.current.contains(event.target)
      ) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target) &&
        !profileRef.current.contains(event.target)
      ) {
        setUserMenuVisible(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      const cleanup = changeDarkMode();
      return cleanup;
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (session) {
      const user = localStorage.getItem("user");
      setUserData(JSON.parse(user));
    }
  }, []);

  if (!session) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <div className="app-container">
        <div className="app-header">
          <div className="app-header-left">
            <span className="app-icon"></span>
            <p className="app-name">Portfolio</p>
            <div className="menu-btn" id="button" onClick={openMenu}>
              <div className="line"></div>
            </div>
          </div>
          <div className="app-header-right">
            <button
              className="mode-switch"
              title="Switch Theme"
              onClick={(e) => {
                setIsDarkMode(true);
              }}
            >
              <svg
                className="moon"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <defs></defs>
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
              </svg>
            </button>
            <button
              className="add-btn"
              title="Add New Post"
              style={userData.bussines ? {} : { display: "none" }}
            >
              <svg
                className="btn-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                //   className="feather feather-plus"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* 👇Notiificaciones 👇*/}
            <button
              className="notification-btn"
              ref={notificationBtnRef}
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <div
              ref={dropdownRef}
              className={`dropdown__wrapper ${
                dropdownVisible ? "dropdown__wrapper--fade-in" : "hide none"
              }`}
            >
              <div className="notifications-top">
                <h2>Notifications</h2>
              </div>
              <div className="notification-items">
                <div className="notification-item notification-item--recent">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="assets/jason.jpg"
                      alt="Jason Alexander"
                    />
                  </div>
                  <div className="notification-item__body">
                    <div>
                      <strong>Jason Alexander</strong> completed{" "}
                      <strong>Issue 131</strong>
                    </div>
                    <span className="time">6 min ago</span>
                  </div>
                  <div className="border"></div>
                </div>
                <div className="notification-item notification-item--recent">
                  <div className="avatar-wrapper">
                    <img
                      className="avatar"
                      src="assets/jason.jpg"
                      alt="Jason Alexander"
                    />
                  </div>
                  <div className="notification-item__body">
                    <div>
                      <strong>Jason Alexander</strong> completed{" "}
                      <strong>Issue 131</strong>
                    </div>
                    <span className="time">6 min ago</span>
                  </div>
                  <div className="border"></div>
                </div>
              </div>
            </div>
            {/* ☝Notiificaciones☝ */}

            <button
              className="profile-btn"
              ref={profileRef}
              onClick={toggleUserMenu}
            >
              <img src={userData?.foto_perfil || ""} alt="user-photo" />
              <span>{userData?.nombre || "No disponible"}</span>
            </button>

            {/* Menu Usuario 👇 */}
            {isUserMenuVisible && (
              <div
                ref={userMenuRef}
                className={`userMenu__dropdown ${
                  isUserMenuVisible ? "userMenu__fadeIn" : "userMenu__fadeOut"
                }`}
              >
                <div className="userMenu__info">
                  <div className="userMenu__name">
                    {userData?.nombre || "No disponible"}
                  </div>
                  <div className="userMenu__email">
                    {userData?.correo || "No disponible"}
                  </div>
                </div>
                <hr className="userMenu__divider" />
                <nav>
                  <ul>
                    <li>
                      <img src="assets/profile.svg" alt="Profile" /> My Profile
                    </li>
                    <li>
                      <img src="assets/settings.svg" alt="Settings" /> Settings
                    </li>
                  </ul>
                  <hr className="userMenu__divider" />
                  <ul>
                    <li>
                      <img src="assets/tutorials.svg" alt="Tutorials" />{" "}
                      Tutorials
                    </li>
                    <li>
                      <img src="assets/help.svg" alt="Help" /> Help Center
                    </li>
                  </ul>
                  <hr className="userMenu__divider" />
                  <ul>
                    <li>
                      <img src="assets/premium.svg" alt="Premium" /> Go Premium
                    </li>
                    <li style={{ color: "#E3452F" }} onClick={handleLogout}>
                      <img src="assets/logout.svg" alt="Log Out" /> Log Out
                    </li>
                  </ul>
                </nav>
              </div>
            )}
            {/* ☝Menu Usuario☝ */}
          </div>
          <button className="messages-btn" onClick={openMessages}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-message-circle"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </button>
        </div>
        <div className="app-content">
          {/* 👇aqui va el menu 👇*/}
          <div className={`app-sidebar ${showMenu ? "show" : ""}`}>
            <a
              type="button"
              className="app-sidebar-link active"
              onClick={() => {
                handleSideBarClick(
                  <Orders
                    session={session}
                    showNotification={showNotification}
                  />
                );
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </a>
          </div>
          {/* ☝aqui va el menu ☝*/}

          {/* 👇aqui va las secciones 👇*/}
          <>
            {selectedComponent || (
              <Orders session={session} showNotification={showNotification} />
            )}
          </>
          {/* ☝aqui va las secciones ☝*/}

          {/* 👇aqui va los mensajes👇*/}
          <div className={`messages-section ${showMessages ? "show" : ""}`}>
            <button className="messages-close" onClick={closeMessages}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </button>
            <div className="projects-section-header">
              <p>Client Messages</p>
            </div>
            <div className="messages">
              <div className="message-box">
                <img
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  alt="profile image"
                />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Stephanie</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-1" />
                      <label htmlFor="star-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    I got your first assignment. It was quite good. 🥳 We can
                    continue with the next assignment.
                  </p>
                  <p className="message-line time">Dec, 12</p>
                </div>
              </div>
              <div className="message-box">
                <img
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                  alt="profile image"
                />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Mark</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-2" />
                      <label htmlFor="star-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    Hey, can tell me about progress of project? I'm waiting for
                    your response.
                  </p>
                  <p className="message-line time">Dec, 12</p>
                </div>
              </div>
              <div className="message-box">
                <img
                  src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDZ8fG1hbnxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile image"
                />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">David</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-3" />
                      <label htmlFor="star-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    Awesome! 🤩 I like it. We can schedule a meeting for the
                    next one.
                  </p>
                  <p className="message-line time">Dec, 12</p>
                </div>
              </div>
              <div className="message-box">
                <img
                  src="https://images.unsplash.com/photo-1533993192821-2cce3a8267d1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTl8fHdvbWFuJTIwbW9kZXJufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile image"
                />
                <div className="message-content">
                  <div className="message-header">
                    <div className="name">Jessica</div>
                    <div className="star-checkbox">
                      <input type="checkbox" id="star-4" />
                      <label htmlFor="star-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-star"
                        >
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </label>
                    </div>
                  </div>
                  <p className="message-line">
                    I am really impressed! Can't wait to see the final result.
                  </p>
                  <p className="message-line time">Dec, 11</p>
                </div>
              </div>
            </div>
          </div>
          {/* ☝aqui va los mensajes☝*/}
        </div>
      </div>

      {notification.visible && (
        <Notification
          action={notification.action}
          message={notification.message}
        />
      )}
    </>
  );
};

export default Home;
