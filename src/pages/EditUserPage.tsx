// src/pages/EditUserPage.tsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, TextField, Button, Typography } from "@mui/material";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  username: string;
  password: string;
}

const EditUserPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    phone: "",
    role: "",
    username: "",
    password: "",
  });

  useEffect(() => {
    fetch("/users.json")
      .then((response) => response.json())
      .then((data) => {
        const userToEdit = data.find((user: User) => user.id === id);
        if (userToEdit) {
          setFormData(userToEdit);
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update user in your data source
    console.log("User updated", formData);
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
        name="phone"
        type="number"
        value={formData.phone}
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
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained">
        Update User
      </Button>
    </Box>
  );
};

export default EditUserPage;
