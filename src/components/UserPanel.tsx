// src/components/UserPanel.tsx
import React from "react";
import Layout from "./Layout";

const UserPanel: React.FC = () => {
  const userLinks = [{ to: "list-customers", text: "List Customers" }];

  return <Layout links={userLinks} role={"admin"} />;
};

export default UserPanel;
