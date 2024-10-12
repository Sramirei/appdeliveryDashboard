import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./context/userContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const App = () => {
  const { session } = useContext(UserContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login session={session} />} />
        <Route path="/" element={<Login />} />
        <Route element={<ProtectedRoute isAllowed={!!session} />}>
          <Route path="/home" element={<Home session={session} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
