// src/components/AdminPanel.tsx
import React from "react";
import Layout from "./Layout";

const AdminPanel: React.FC = () => {
  const adminLinks = [
    { to: "create-user", text: "Create User" },
    { to: "list-users", text: "List Users" },
  ];

  return <Layout links={adminLinks} role={"admin"} />;
};

export default AdminPanel;
