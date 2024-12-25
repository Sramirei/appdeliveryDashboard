import React, { useState } from "react";
import { FaCamera } from "react-icons/fa";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import "./Settings.css";

const mapContainerStyle = {
    width: "100%",
    height: "200px",
  };
  
  const center = {
    lat: 3.4132347, // Coordenadas de ejemplo (Poblado campestre, Colombia)
    lng: -76.4678761,
  };
function Settings() {
    const [bannerImage, setBannerImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    descripcion: "",
    ubicacion: "",
    redesSociales: {
      facebook: "",
      instagram: "",
      tiktok: "",
    },
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBWbBuG-5wDFCYRIjw_xVo040Dfm8vVhvQ", // Reemplaza con tu clave API
  });

  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleMapClick = (event) => {
    setSelectedPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["facebook", "instagram", "tiktok"].includes(name)) {
      setFormData((prevState) => ({
        ...prevState,
        redesSociales: {
          ...prevState.redesSociales,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    console.log("Datos guardados:", formData);
    alert("Datos actualizados con éxito!");
  };
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBannerImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleLogoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogoImage(reader.result);
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
        <div className="projects-section">
            <div className="project-boxes">
                {/* Banner */}
                <div
                    className="settings-banner"
                    style={{
                    backgroundImage: `url(${bannerImage || "https://via.placeholder.com/1200x200"})`,
                    }}
                >
                    <div className="settings-banner-hover">
                    <label htmlFor="banner-upload" className="settings-camera-icon">
                        <FaCamera />
                    </label>
                    <input
                        type="file"
                        id="banner-upload"
                        accept="image/*"
                        onChange={handleBannerChange}
                        className="settings-hidden-input"
                    />
                    </div>
                </div>

                {/* Logo */}
                <div className="settings-logo-container">
                    <div className="settings-logo-wrapper">
                    <img
                        src={logoImage || "https://via.placeholder.com/120"}
                        alt="Logo"
                        className="settings-logo"
                    />
                    <div className="settings-logo-hover">
                        <label htmlFor="logo-upload" className="settings-camera-icon">
                            <FaCamera />
                        </label>
                        <input
                        type="file"
                        id="logo-upload"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="settings-hidden-input"
                        />
                    </div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="settings-form-container">
                    {/* Nombre y Descripción */}
                    <div className="settings-row">
                        <div className="settings-column">
                            <label className="settings-label">Nombre</label>
                            <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="settings-input"
                            />
                        </div>
                        
                    </div>
                    <div className="settings-row">
                        <div className="settings-column">
                            <label className="settings-label">Descripción</label>
                            <textarea
                            name="descripcion"
                            value={formData.descripcion}
                            onChange={handleChange}
                            className="settings-textarea"
                            />
                        </div>
                    </div>
                    {/* Dirección y Ubicación */}
                    <div className="settings-row">
                        <div className="settings-column">
                            <label className="settings-label">Dirección</label>
                            <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            className="settings-input"
                            />
                        </div>
                        {/* <div className="settings-column">
                            <label className="settings-label">Ubicación (Google Maps)</label>
                            <input
                            type="text"
                            name="ubicacion"
                            value={formData.ubicacion}
                            onChange={handleChange}
                            placeholder="Pega aquí el enlace de Google Maps"
                            className="settings-input"
                            />
                        </div> */}
                    </div>
                    <div className="settings-row">
                        {isLoaded ? (
                            <GoogleMap
                                mapContainerStyle={mapContainerStyle}
                                zoom={14}
                                center={selectedPosition || center}
                                onClick={handleMapClick}
                            >
                                {selectedPosition && (
                                    <Marker position={selectedPosition} />
                                )}
                            </GoogleMap>
                        ) : (
                        <p>Loading map...</p>
                        )}
                        {/* {selectedPosition && (
                        <p>
                            Latitude: {selectedPosition.lat}, Longitude: {selectedPosition.lng}
                        </p>
                        )} */}
                    </div>
                    {/* Redes Sociales */}
                    <div className="settings-row">
                        <div className="settings-column">
                            <label className="settings-label">Facebook</label>
                            <input
                            type="text"
                            name="facebook"
                            value={formData.redesSociales.facebook}
                            onChange={handleChange}
                            className="settings-input"
                            />
                        </div>
                        <div className="settings-column">
                            <label className="settings-label">Instagram</label>
                            <input
                            type="text"
                            name="instagram"
                            value={formData.redesSociales.instagram}
                            onChange={handleChange}
                            className="settings-input"
                            />
                        </div>
                        <div className="settings-column">
                            <label className="settings-label">TikTok</label>
                            <input
                            type="text"
                            name="tiktok"
                            value={formData.redesSociales.tiktok}
                            onChange={handleChange}
                            className="settings-input"
                            />
                        </div>
                    </div>

                    {/* Botón Guardar */}
                    <button onClick={handleSave} className="settings-save-button">
                    Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    </>

  );
}

export default Settings;
