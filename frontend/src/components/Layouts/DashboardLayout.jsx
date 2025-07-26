import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
