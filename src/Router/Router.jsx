import React from "react";
import { Route, Routes } from "react-router-dom";
import Entry from "../pages/Entry/Entry";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Entry />} />
      </Routes>
    </div>
  );
};

export default Router;
