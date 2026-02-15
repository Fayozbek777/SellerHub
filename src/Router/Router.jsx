import React from "react";
import { Route, Routes } from "react-router-dom";
import Entry from "../pages/Entry/Entry";
import SellerHome from "../pages/seller/SellHome/SellerHome";
import Home from "../pages/buyer/Home/Home";
import Register from "../pages/seller/Register/Register";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/seller" element={<SellerHome />} />
        <Route path="/buyer" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
};

export default Router;
