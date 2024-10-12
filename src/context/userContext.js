/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const UserContext = createContext();
const UserProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const loggedUserJSON = window.localStorage.getItem("user");
  const token = window.sessionStorage.getItem("token");

  const fetchIp = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      sessionStorage.setItem("ip", data.ip);
    } catch (error) {
      console.error(error);
    }
  };

  const verifyToken = (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(process.env.REACT_APP_API_URL + "/users/verifyToken", config)
      .then((res) => {
        const user = JSON.parse(loggedUserJSON);
        setSession(user);
      })
      .catch((error) => {
        console.log(error);
        localStorage.clear();
        sessionStorage.clear();
        Swal.fire({
          icon: "error",
          title: "Your session expired",
          text: "Su sesion caduco, Por favor inicie sesion nuevamente",
        }).then(() => {
          setSession(null);
        });
      });
  };

  const login = async (body) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,
        body
      );

      if (response.data.code === 1) {
        fetchIp();
        const user = response.data;
        localStorage.setItem("user", JSON.stringify(user.user));
        sessionStorage.setItem("token", user.token);
        return {
          success: true,
          user,
        };
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (loggedUserJSON) {
      verifyToken(token);
    }
  }, []);

  const handleLogout = () => {
    setSession(null);
    localStorage.clear();
    sessionStorage.clear();
  };

  const data = { session, login, handleLogout };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;
