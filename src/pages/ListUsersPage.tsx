import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux";
import { fetchUsers } from "../services/api";
import { User } from "../models/user";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Box,
} from "@mui/material";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const token = useSelector((state: RootState) => state.user.token); // Get token from Redux state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (token) {
          const userData = await fetchUsers(token); // Pass token to fetchUsers
          setUsers(userData);
        }
      } catch (error: any) {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);
  const handleEdit = (id: any) => {
    navigate(`/admin/edit-user/${id}`);
  };
  if (loading) {
    return (
      <Container>
        <CircularProgress />
        <Typography>Loading users...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Edit</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userID}>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.userName}</TableCell>
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
