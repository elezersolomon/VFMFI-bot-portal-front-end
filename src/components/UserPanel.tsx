import React from "react";
import Layout from "./Layout";

const AdminPanel: React.FC = () => {
  const adminLinks = [
    { to: "/admin/dashboard", text: "Dashboard" },
    { to: "/admin/users", text: "Manage Users" },
  ];

  return (
    <Layout links={adminLinks} role="admin">
      {/* Your AdminPanel content goes here */}
      <div>Welcome to the Admin Panel!</div>
    </Layout>
  );
};

export default AdminPanel;
