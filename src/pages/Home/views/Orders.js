import React, { useState, useEffect } from "react";
import "../style.css";

import axios from "axios";
import "@github/relative-time-element";
import { GrUpdate } from "react-icons/gr";
import { FaDoorOpen } from "react-icons/fa6";
import { FaPowerOff } from "react-icons/fa";

import Received from "../../../assets/icons/received.gif";
import Pending from "../../../assets/icons/pending.gif";
import OnTheWay from "../../../assets/icons/on-the-way.gif";
import Delivered from "../../../assets/icons/delivered.gif";
import Next from "../../../assets/icons/Next.gif";

const Orders = ({ session, showNotification }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [stateBussiness, setStateBussiness] = useState(null);
  const [code,setCode]=useState("");
  // const [validateCode, setValidateCode] = useState("");
  const [orders, setOrders] = useState([]);
  
  
  const getDataBussiness = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/negocios/${session.bussines}`
      );

      if (response?.data?.code === 1) {
        const data = response.data.data;

        if (data?.horario_apertura && !data?.horario_cierre) {
          setStateBussiness("on");
        } else {
          setStateBussiness("off");
        }
      } else {
        console.error("Error en la respuesta de la API:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener datos del negocio:", error.message);
    }
  };

  const getOrders = async () => {
    if (stateBussiness === "on") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/pedidos/all/${session.bussines}`
        );
        if (response?.data?.code === 1) {
          const today = new Date();
          const startOfDay = new Date(today.setHours(0, 0, 0, 0)); // Inicio del día
          const endOfDay = new Date(today.setHours(23, 59, 59, 999)); // Fin del día

          // Filtrar las órdenes por fecha del día actual
          const filteredOrders = response.data.data.filter((order) => {
            const orderDate = new Date(order.fecha_pedido.replace(" ", "T")); // Convertir a formato ISO 8601
            return orderDate >= startOfDay && orderDate <= endOfDay;
          });

          setOrders(filteredOrders); // Guardar solo las órdenes del día
        } else {
          console.error("Error en la respuesta de la API:", response.data);
          throw new Error(response);
        }
      } catch (error) {
        console.error("Error al obtener datos de las órdenes:", error.message);
      }
    } else {
      setOrders([]);
    }
  };

  const startTheDay = async () => {
    const body = {
      id: session.bussines,
      openDate: new Date(),
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/negocios/open`,
        body
      );
      if (response.data.code === 1) {
        setStateBussiness("on");
        showNotification("success", "Jornada Iniciada");
      } else {
        console.error("Error en la respuesta de la API:", response.data);
        showNotification("error", "Error en la respuesta de la API");
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error Inesperado:", error);
      showNotification("error", "Error Inesperado");
    }
  };

  const closeDay = async () => {
    const body = {
      id: session.bussines,
      closeDate: new Date(),
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/negocios/close`,
        body
      );
      if (response.data.code === 1) {
        setStateBussiness("off");
        showNotification("success", "Jornada Cerrada");
      } else {
        console.error("Error en la respuesta de la API:", response.data);
        showNotification("error", "Error en la respuesta de la API");
        throw new Error(response.data);
      }
    } catch (error) {
      console.error("Error Inesperado:", error);
      showNotification("error", "Error Inesperado");
    }
  };

  const formatDate = (dateInput) => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date)) throw new Error("Invalid date");
      return new Intl.DateTimeFormat("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }).format(date);
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return "Invalid Date";
    }
  };

  const stateIcon = (state) => {
    switch (state) {
      case 1:
        return <img src={Received} alt="Creado" />;
      case 2:
        return <img src={Pending} alt="Pendiente" />;
      case 3:
        return <img src={OnTheWay} alt="En Camino" />;
      case 4:
        return <img src={Delivered} alt="Entregado" />;
      default:
        return "Estado No identificado";
    }
  };

  useEffect(() => {
    function getFormattedDateTime() {
      const days = [
        "Domingo",
        "Lunes",
        "Martes",
        "Miércoles",
        "Jueves",
        "Viernes",
        "Sábado",
      ];
      const months = [
        "enero",
        "febrero",
        "marzo",
        "abril",
        "mayo",
        "junio",
        "julio",
        "agosto",
        "septiembre",
        "octubre",
        "noviembre",
        "diciembre",
      ];

      const now = new Date();
      const dayName = days[now.getDay()];
      const day = now.getDate();
      const monthName = months[now.getMonth()];
      const year = now.getFullYear();

      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const period = hours >= 12 ? "pm" : "am";

      hours = hours % 12 || 12; // Convierte 0 a 12 para el formato 12 horas

      return `${dayName} ${day}, ${monthName} del ${year} ${hours}:${minutes} ${period}`;
    }

    const interval = setInterval(() => {
      setCurrentDate(getFormattedDateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    getDataBussiness();
  }, []);

  useEffect(() => {
    if (stateBussiness === "on") {
      getOrders();
    } else if (stateBussiness === "off") {
      setOrders([]);
    }
  }, [stateBussiness]);

  const handleChangeStatus = async (idPedido) => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/pedidos/update/status/${idPedido}`, {
        id_pedido: idPedido,
        estado: 2,
      });
      if (response.status === 200) {
        alert("Estado actualizado exitosamente");
      }
    } catch (error) {
      console.error("Error al cambiar el estado:", error);
      alert("Hubo un problema al actualizar el estado");
    }
  };
  const getProgressWidth = (estado) => {
    switch (estado) {
      case 1:
        return "80px";
      case 2:
        return "120px";
      case 3:
        return "200px";
      case 4:
        return "300px";
      default:
        return "0px"; // Ancho por defecto si el estado no coincide
    }
  };
  
  const getProgressPercentage = (estado) => {
    switch (estado) {
      case 1:
        return "20%";
      case 2:
        return "40%";
      case 3:
        return "60%";
      case 4:
        return "100%";
      default:
        return "0%"; // Porcentaje por defecto
    }
  };
  const validateCode = async (code, id_pedido) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/pedidos/consultCode/${id_pedido}/${code}/3`
      );
      if (response.data.code === 1) {
        alert("Estado actualizado exitosamente");
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id_pedido === id_pedido
              ? { ...order, estado: 3, code_delivery: code } 
              : order
          )
        );
      } else {
        alert("Error al validar el código. Intente nuevamente.");
      }
    } catch (error) {
      console.error("Error al validar el código:", error);
      alert("Hubo un problema al validar el código.");
    }
  };
  
  return (
    <>
      <div className="projects-section">
        {/* Header */}
        <div className="projects-section-header">
          <p>Pedidos</p>
          <p className="time">{currentDate}</p>
        </div>
        {/* Informacion o datos */}
        <div className="projects-section-line">
          <div className="projects-status">
            <div className="item-status">
              <span className="status-number">
                {orders.filter((order) => order.estado === 1).length}
              </span>
              <span className="status-type">Creadas</span>
            </div>
            <div className="item-status">
              <span className="status-number">
                {orders.filter((order) => order.estado === 2).length}
              </span>
              <span className="status-type">Pendiente</span>
            </div>
            <div className="item-status">
              <span className="status-number">{orders.length}</span>
              <span className="status-type">Totales</span>
            </div>
          </div>
          <div className="view-actions">
            {stateBussiness === "on" && (
              <button className="view-btn" title="Update" onClick={getOrders}>
                <GrUpdate />
              </button>
            )}

            {stateBussiness === "on" && (
              <button className="view-btn" title="Close" onClick={closeDay}>
                <FaDoorOpen />
              </button>
            )}

            {stateBussiness === "off" && (
              <button className="view-btn" title="Open" onClick={startTheDay}>
                <FaPowerOff />
              </button>
            )}
          </div>
        </div>

        {/* contenido jsGridView 👉 para usar cuadricula o jsListView 👉 para usar Listas */}
        <div className="project-boxes jsGridView">
          {/* la clase project-box-wrapper es para crear los items dentro del contenedor (las cajitas o las listas) */}
          {orders.length > 0 ? (
            orders
              .filter((order) => order.estado !== 4)
              .map((order, _index) => {
                return (
                  <div key={order.id_pedido} className="project-box-wrapper">
                    {/* esta es el elemnto (cajita) no cambiar las clases! */}
                    <div
                      className="project-box"
                      style={{ backgroundColor: "#fee4cb" }}
                    >
                      {/* Header de la cajita */}
                      <div className="project-box-header">
                        <span>{formatDate(order.fecha_pedido)}</span>
                      </div>
                      {/* contenido de la cajita */}
                      <div className="project-box-content-header">
                        <p className="box-content-header"># De Orden: {order.id_pedido}</p>
                        <p className="box-content-subheader">Total: {order.total}</p>
                        {order.estado === 2 ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8%" }}>
                            <input type="text" className="input-rounded" placeholder="Código de entrega" onChange={(e) => setCode(e.target.value)}/>
                              <button className="button-validate" onClick={() => validateCode(code,order.id_pedido)}>
                                Validar
                              </button>
                          </div>
                        ) : order.estado === 3 ? (
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "9%" }}>
                            <p style={{ fontSize: "14px", margin: 0, color: "#4caf50" }}>{order.code_delivery}</p>
                            <span style={{ color: "#4caf50", fontSize: "16px" }}>✔</span> {/* Chulo de verificado */}
                          </div>
                        ): <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "19%" }}></div>}
                      </div>

                      <div className="box-progress-wrapper">
                        <p className="box-progress-header">Progress</p>
                        <div className="box-progress-bar">
                          <span
                            className="box-progress"
                            style={{
                              width: getProgressWidth(order.estado),
                              backgroundColor: "#ff942e",
                            }}
                          ></span>
                        </div>
                        <p className="box-progress-percentage">{getProgressPercentage(order.estado)}</p>
                      </div>
                      {/* footer de la cajita */}
                      <div className="project-box-footer">
                        <div className="participants">
                          {stateIcon(order.estado)}
                          {order.estado === 1 ? (
                          <button 
                            className="add-participant"
                            style={{ color: "#ff942e" }}
                            onClick={() => handleChangeStatus(order.id_pedido)}
                          >
                            <img src={Next} alt="Siguiente" />
                          </button>
                          ):null}
                        </div>
                        <div className="days-left" style={{ color: "#ff942e" }}>
                          <relative-time
                            datetime={order.fecha_pedido}
                            lang="es"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div>
              {stateBussiness === "off"
                ? "Restaurante cerrado"
                : "No hay ordenes"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
