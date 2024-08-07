// src/routes.tsx
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import AdminPanel from "./components/AdminPanel";
import CreateUserPage from "./pages/CreateUserPage";
import ListUsersPage from "./pages/ListUsersPage";
import UserHomepage from "./pages/UserHomepage";
import CustomersPage from "./pages/CustomersPage";
import SettingsPage from "./pages/SettingsPage";
import EditUserPage from "./pages/EditUserPage";
import LoginPage from "./pages/LoginPage";

const AppRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/admin"
        element={
          <Layout
            role="admin"
            links={[
              { to: "/admin/create-user", text: "Create User" },
              { to: "/admin/list-users", text: "List Users" },
            ]}
          />
        }
      >
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="list-users" element={<ListUsersPage />} />
        <Route path="edit-user/:id" element={<EditUserPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
      <Route
        path="/user"
        element={
          <Layout
            role="user"
            links={[{ to: "/user/customers", text: "Customers" }]}
          />
        }
      >
        <Route path="customers" element={<CustomersPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
