import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const DashboardLayout = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [session, setSession] = useState([]);
  const [openDeleteSAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });
  const fetchAllSession = async () => {};
  const deleteSession = async (sessionData) => {};

  useEffect(() => {
    fetchAllSession();
  }, []);
  return (
    <div>
      <Navbar />
      {user && <div>{children}</div>}
    </div>
  );
};

export default DashboardLayout;
