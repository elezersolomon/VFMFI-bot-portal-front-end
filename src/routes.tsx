// src/routes.tsx
import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import AdminPanel from "./components/AdminPanel";
import Dashboard from "./pages/Dashboard"; // Import the dashboard page
import CreateUserPage from "./pages/CreateUserPage";
import ListUsersPage from "./pages/ListUsersPage";
import EditUserPage from "./pages/EditUserPage";
import SettingsPage from "./pages/SettingsPage";
import LoginPage from "./pages/LoginPage";
import CustomersPage from "./pages/CustomersPage";

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
              { to: "/admin/dashboard", text: "Dashboard" }, // Add Dashboard link
              { to: "/admin/create-user", text: "Create User" },
              { to: "/admin/list-users", text: "List Users" },
            ]}
          />
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="list-users" element={<ListUsersPage />} />
        <Route path="edit-user/:id" element={<EditUserPage />} />
        <Route path="settings" element={<SettingsPage />} />
        {/* Redirect to dashboard by default if no other child route is matched */}
        <Route index element={<Navigate to="dashboard" />} />
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
