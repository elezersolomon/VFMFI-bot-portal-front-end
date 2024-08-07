import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Container,
  Alert,
} from "@mui/material";

const SettingsPage: React.FC = () => {
  const [previousPassword, setPreviousPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = () => {
    // Basic validation
    if (newPassword !== confirmNewPassword) {
      setError("New password and confirmation do not match.");
      return;
    }
    if (
      previousPassword === "" ||
      newPassword === "" ||
      confirmNewPassword === ""
    ) {
      setError("All fields are required.");
      return;
    }

    // Reset error and success messages
    setError("");
    setSuccess("Password changed successfully!");

    // Add logic to handle password change (e.g., send request to server)
  };

  return (
    <Container>
      <Box
        sx={{
          maxWidth: 500,
          mx: "auto",
          mt: 4,
          p: 3,
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Settings
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Previous Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={previousPassword}
            onChange={(e) => setPreviousPassword(e.target.value)}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="outlined"
            margin="normal"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SettingsPage;
