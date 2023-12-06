import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AllMenus from "./components/AllMenus.jsx";
import AddMenu from "./components/AddMenu.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<AddMenu />} />
          <Route path="menus" element={<AllMenus />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
