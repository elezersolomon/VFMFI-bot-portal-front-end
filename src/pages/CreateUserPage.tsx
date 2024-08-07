// src/pages/CreateUserPage.tsx
import React, { useState } from "react";
import { Box, Button, TextField, MenuItem, Typography } from "@mui/material";

const CreateUserPage: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleCreateUser = () => {
    // Logic to create user
    console.log({ name, username, phone, password, role });
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create User
      </Typography>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone Number"
        type="number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        select
        label="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        fullWidth
        margin="normal"
      >
        <MenuItem value="admin">Admin</MenuItem>
        <MenuItem value="user">User</MenuItem>
      </TextField>
      <Button variant="contained" color="primary" onClick={handleCreateUser}>
        Create User
      </Button>
    </Box>
  );
};

export default CreateUserPage;
