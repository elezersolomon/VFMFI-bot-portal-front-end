import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import { updateUser } from "../services/api"; // Import the updateUser API function
import { RootState } from "../redux";
import { useSelector } from "react-redux";
import NotificationModal from "../components/NotificationModal"; // Notification modal for messages

const EditUser: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.user.token); // Get token from Redux state

  const user = location.state?.user; // Get user data passed from ListUsers page

  const initialFormData = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phoneNumber || "",
    role: user?.role || "",
    email: user?.email || "",
    userName: user?.userName || "",
    userID: user?.userID || "",
    password: "", // Leave password empty to allow it to be updated if needed
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | "info">(
    "info"
  );
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  // Function to handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear message when inputs are edited
    if (message) {
      setMessage(null);
      setMessageType("info");
    }
  };

  // Function to check if any value has changed from the initial state
  const hasFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialFormData);
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if any form value has changed
    if (!hasFormChanged()) {
      setMessage("Please make changes before submitting.");
      setMessageType("info");
      setModalOpen(true);
      return;
    }

    try {
      await updateUser(formData, token); // Send the update request to the API
      setMessage("User updated successfully!");
      setMessageType("success");
      setModalOpen(true);
    } catch (error) {
      setMessage("Failed to update user. Please try again.");
      setMessageType("error");
      setModalOpen(true);
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 8 }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h4">Edit User</Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Phone Number"
        name="phoneNumber"
        type="number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <TextField
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      />
      <TextField
        label="Username"
        name="userName"
        value={formData.userName}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained">
        Update User
      </Button>

      {/* Notification Modal */}
      <NotificationModal
        message={message || ""}
        messageType={messageType}
        onClose={() => {
          setMessage(null);
          setMessageType("info");
          setModalOpen(false);
        }}
        isOpen={isModalOpen}
      />
    </Box>
  );
};

export default EditUser;
