/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, useEffect, useContext } from "react";
import "./style.css";
import UserContext from "../../context/userContext";
import { Navigate } from "react-router-dom";

import ProfileLogo from "../../assets/icons/profile.gif";
import LogOutIcon from "../../assets/icons/Log_out.gif";

import Notification from "../../components/notification/Notification";
import Messages from "../../components/messages/Messages";
import DetailOrder from "../../components/DetailOrder/DetailOrder";
import ProfileUser from "../../components/ProfileUser/ProfileUser";
import Orders from "./views/Orders";
import Product from "./views/Products/Product";
import Sales from "./views/Sales/Sales";
import Settings from "./views/Settings/Settings";
// Icons
import { IoMdExit } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { TfiNotepad } from "react-icons/tfi";
import { FaUserCircle } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import {
  AiOutlineClose,
  AiOutlinePicture,
  AiOutlineSmile,
} from "react-icons/ai";
import { IoMdSend } from "react-icons/io";

import EmojiPicker from "emoji-picker-react";

const Home = ({ session }) => {
  const [showMessages, setShowMessages] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [notification, setNotification] = useState({
    action: "success",
    message: "",
    visible: false,
  });
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("order");
  const [rightComponente, setRightComponente] = useState("message");
  const [isUserMenuVisible, setUserMenuVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [userData, setUserData] = useState({});
  const [showPofileUserModal, setShowPofileUserModal] = useState(false);

  const notificationBtnRef = useRef(null);
  const dropdownRef = useRef(null);
  const userMenuRef = useRef(null);
  const profileRef = useRef(null);
  const [postText, setPostText] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  // Funciones para manejar el modal y la imagen
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setPostText("");
    setImage(null);
    setShowEmojiPicker(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const onEmojiClick = (emojiData) => {
    setPostText((prevText) => prevText + emojiData.emoji); // Usa directamente emojiData.emoji
    setShowEmojiPicker(false);
  };
  const { handleLogout } = useContext(UserContext);

  const menuItems = [
    { name: "Ordenes", component: "ordes", icon: <TfiNotepad /> },
    { name: "Productos", component: "product", icon: <IoFastFoodOutline /> },
    { name: "Ventas", component: "sale", icon: <HiOutlineDocumentReport /> },
  ];

  // component change
  const handleSideBarClick = () => {
    switch (selectedComponent) {
      case "ordes":
        return (
          <Orders
            session={session}
            showNotification={showNotification}
            changeRightComponent={changeRightComponent}
          />
        );
      case "product":
        return (
          <Product session={session} showNotification={showNotification} />
        );
      case "sale":
        return (
          <Sales
            session={session}
            showNotification={showNotification}
            changeRightComponent={changeRightComponent}
          />
        );
      case "settings":
        return (
          <Settings
            session={session}
            showNotification={showNotification}
            changeRightComponent={changeRightComponent}
          />
        );
      default:
        return (
          <Orders
            session={session}
            showNotification={showNotification}
            changeRightComponent={changeRightComponent}
          />
        );
    }
  };

  const changeComponent = (componentName) => {
    setSelectedComponent(componentName);
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

  const restarRightComponente = () => {
    setRightComponente("message");
  };

  const changeRightComponent = (componentName, id = null) => {
    setRightComponente(componentName);
    if (id) {
      setSelectedId(id); // Guarda el id si se pasa
    }
  };

  const renderRightComponent = () => {
    switch (rightComponente) {
      case "message":
        return <Messages />;
      case "detail":
        return (
          <DetailOrder
            id={selectedId}
            changeRightComponent={changeRightComponent}
          />
        );
      default:
        return <Messages />;
    }
  };

  const openProfileUserModal = () => setShowPofileUserModal(true);

  const closeProfileUserModal = () => setShowPofileUserModal(false);

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
              onClick={openModal}
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
              <img
                src={
                  process.env.REACT_APP_API_URL_IMG + userData?.foto_perfil ||
                  ""
                }
                alt="user-photo"
              />
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
                    <li onClick={openProfileUserModal}>
                      <img src={ProfileLogo} alt="Profile" /> My Profile
                    </li>
                    <li>
                      <FaUserCircle /> Mi perfil
                    </li>
                    <li onClick={() => setSelectedComponent("settings")}>
                      <CiSettings /> Configuración
                    </li>
                  </ul>
                  <hr className="userMenu__divider" />
                  <ul>
                    <li style={{ color: "#E3452F" }} onClick={handleLogout}>
                      <img src={LogOutIcon} alt="Log Out" /> Salir
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
            {menuItems.map((menuItem) => (
              <a
                type="button"
                className="app-sidebar-link active"
                onClick={() => {
                  changeComponent(menuItem.component);
                }}
              >
                {menuItem.icon}
              </a>
            ))}
          </div>
          {/* ☝aqui va el menu ☝*/}

          {/* 👇aqui va las secciones 👇*/}
          <>{handleSideBarClick()}</>
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
            {renderRightComponent()}
          </div>

          {isModalOpen && (
            <div className="modal-backdrop" onClick={closeModal}>
              <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Cerrar Modal */}
                <AiOutlineClose className="close-icon" onClick={closeModal} />

                <textarea
                  placeholder="What do you want to share?"
                  rows="4"
                  value={postText}
                  onChange={(e) => setPostText(e.target.value)}
                  className="post-textarea"
                />

                {/* Mostrar Imagen */}
                {image && (
                  <div className="image-preview">
                    <img src={image} alt="Preview" />
                  </div>
                )}

                {/* Selector de Emojis */}
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                  </div>
                )}

                {/* Botones de acción */}
                <div className="modal-actions">
                  <button
                    className="icon-btn"
                    onClick={() => setShowEmojiPicker((prev) => !prev)}
                  >
                    <AiOutlineSmile size={24} />
                  </button>
                  <label htmlFor="image-upload" className="icon-btn">
                    <AiOutlinePicture size={24} />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                  <button
                    className="send-btn"
                    onClick={() => console.log("Post Sent!")}
                  >
                    <IoMdSend size={24} />
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* ☝aqui va los mensajes☝*/}
        </div>
      </div>

      {notification.visible && (
        <Notification
          action={notification.action}
          message={notification.message}
        />
      )}

      <ProfileUser
        isOpen={showPofileUserModal}
        onClose={closeProfileUserModal}
        user={session.user.id_usuario}
      />
    </>
  );
};

export default Home;
