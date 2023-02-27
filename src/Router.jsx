import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Join from "./pages/Join";
import Login from "./pages/Login";
import Home from "./pages/Home";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="pages/Home" element={<Home />} />
      <Route path="pages/Login" element={<Login />} />
      <Route path="pages/Join" element={<Join />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
