import React, { useEffect, useState } from "react";
import { fetchUsers } from "../services/api";
import { RootState } from "../redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Typography,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

import { User } from "../models/user";

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUsers(token);
        setUsers(userData);
      } catch (error: any) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleEdit = (userID: number) => {
    const userToEdit = users.find((user) => user.userID === userID);
    if (userToEdit) {
      navigate(`/admin/edit-user/${userID}`, { state: { user: userToEdit } });
    }
  };

  const handleStatusChange = (userID: number, newStatus: string) => {
    const updatedUsers = users.map((user) =>
      user.userID === userID ? { ...user, status: newStatus } : user
    );
    setUsers(updatedUsers);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <Box>
        <CircularProgress />
        <Typography>Loading users...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        label="Search Users"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Status</TableCell> {/* New Status Column */}
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.userID}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.userName}</TableCell>
              <TableCell>
                <Select
                  value={user.status}
                  onChange={(e) =>
                    handleStatusChange(user.userID, e.target.value)
                  }
                >
                  <MenuItem value="Active">Active</MenuItem>
                  <MenuItem value="Disabled">Disabled</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleEdit(user.userID)}
                >
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button variant="contained" color="secondary">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ListUsers;
