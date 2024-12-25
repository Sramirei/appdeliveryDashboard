import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import "./detailOrderStyle.css";
const DetailOrder = ({ id, changeRightComponent }) => {
  const [orderDetails, setOrderDetails] = useState(null); // Para almacenar los datos de la orden
  const [loading, setLoading] = useState(true); // Indicador de carga
  const [error, setError] = useState(null); // Manejo de errores

  // Llamar a la API cuando cambie el ID
  useEffect(() => {
    if (!id) return; // No hacer la llamada si no hay ID

    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/pedidos/getProductOrderId/${id}`);
        console.log(response.data.data.productos);
        
        setOrderDetails(response.data.data);
      } catch (err) {
        setError("Error al cargar los detalles de la orden.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  // Renderizar mientras carga
  if (loading) {
    return <div>Cargando detalles de la orden...</div>;
  }

  // Mostrar error si ocurrió
  if (error) {
    return <div className="projects-section-header">
      <button className="button-validate">
          <IoIosArrowBack />
        </button>{error}
        </div>;
  }

  // Renderizar los datos de la orden
  return (
    <>
      <div className="projects-section-header">
        <button onClick={() => changeRightComponent("message")} className="button-validate">
          <IoIosArrowBack />
        </button>
        Número de orden: {id}
      </div>
      <div className="projects-section-details">
        <div className="projects-section-details">
          <h3>Detalles de la Orden:</h3>
          {/* <p><strong>Cliente:</strong> {orderDetails?.cliente || "Desconocido"}</p> */}
          <p><strong>Fecha:</strong> {orderDetails?.fecha_pedido || "Fecha no disponible"}</p>
          <p><strong>Total:</strong> ${orderDetails?.total || "0"}</p>
          <p><strong>Estado:</strong> {orderDetails?.estado || "Sin estado"}</p>

          <div className="products-details">
            <h4>Productos:</h4>
            {orderDetails?.productos?.length > 0 ? (
              orderDetails.productos.map((producto, index) => {
                let ingredientes = [];
                let adicionales = [];
                try {
                  if (producto.ingredientes) {
                    const parsedData = JSON.parse(producto.ingredientes);
                    ingredientes = parsedData.ingredients || [];
                    adicionales = parsedData.additionalIngredients || [];
                  }
                } catch (error) {
                  console.error("Error al parsear los ingredientes:", error);
                }

                return (
                  <div key={index} className="product-card">
                    <div className="product-header">
                      <img
                        src={process.env.REACT_APP_API_URL_IMG+producto.foto || "/default-image.png"}
                        alt={producto.nombre}
                        className="product-image"
                      />
                      <div className="product-name">
                        <h5>{producto.nombre || "Producto sin nombre"}</h5>
                        <p>Cantidad: {producto.cantidad || 0}</p>
                      </div>
                    </div>

                    <div className="product-details">
                      <h5>Ingredientes:</h5>
                      {ingredientes.length > 0 ? (
                        ingredientes.map((ingredient, idx) => (
                          <p
                            key={idx}
                            className={`ingredient ${ingredient.removed ? "removed" : "active"}`}
                          >
                            {ingredient.name}
                          </p>
                        ))
                      ) : (
                        <p>No hay ingredientes.</p>
                      )}

                      <h5>Adiciones:</h5>
                      {adicionales.length > 0 ? (
                        adicionales.map((add, idx) => (
                          <p
                            key={idx}
                            className={`additional ${add.added ? "added" : "not-added"}`}
                          >
                            {add.name} - ${add.price}
                          </p>
                        ))
                      ) : (
                        <p>No hay adicionales.</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p>No hay productos en la orden.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailOrder;