import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* <Route element={<ProtectedRoute isAllowed={!!session} />}>
          <Route path="/home" element={<Home />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
