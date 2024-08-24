// src/pages/SettingsPage.tsx
import React, { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { hashPassword } from "../utils/hashPassword";

const SettingsPage: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match");
      return;
    }

    // Simulate verifying the current password
    // Replace this with your actual verification logic
    const isValidCurrentPassword = currentPassword === "adminpass"; // Replace with real check

    if (!isValidCurrentPassword) {
      alert("Current password is incorrect");
      return;
    }

    const hashedPassword = await hashPassword(newPassword);
    console.log("consoleData_ hashed password", hashedPassword);
    console.log("Hashed Password:", hashedPassword);

    // Here you would typically send the hashed password to your server to update the user's password
    alert("Password updated successfully");
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Confirm New Password"
        type="password"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
        sx={{ mt: 2 }}
      >
        Apply
      </Button>
    </Box>
  );
};

export default SettingsPage;
