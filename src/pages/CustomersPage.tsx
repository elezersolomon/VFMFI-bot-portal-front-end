import React, { useEffect, useState } from "react";
import { fetchCustomers, updateCustomer } from "../services/api"; // Import fetchCustomers and updateCustomerStatus
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
  FormControl,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material"; // Import SelectChangeEvent
import { useSelector } from "react-redux";

import { Customer } from "../models/user";

const ListCustomers: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>(""); // State for search term
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const token = useSelector((state: RootState) => state.user.token); // Get token from Redux state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerData = await fetchCustomers(token);
        setCustomers(customerData);
        console.log("consoleData_customerData", customerData);
        setFilteredCustomers(customerData);
        // Set the filtered customers initially to all customers
      } catch (error: any) {
        setError("Failed to fetch customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [token]);

  // Update filtered customers based on search term
  useEffect(() => {
    const searchFilteredCustomers = customers.filter(
      (customer) =>
        customer.userFName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.userLName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phoneNumber.includes(searchTerm) ||
        customer.telegramUserName
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(searchFilteredCustomers);
  }, [searchTerm, customers]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (customerID: number) => {
    const customerToEdit = customers.find(
      (customer) => customer.userID === customerID
    );
    if (customerToEdit) {
      navigate(`/admin/edit-customer/${customerID}`, {
        state: { customer: customerToEdit },
      });
    }
  };

  const handleStatusChange = async (
    event: SelectChangeEvent<string>,
    customerID: number
  ) => {
    const newStatus = event.target.value;

    // Find the customer to update
    const customerToUpdate = customers.find(
      (customer) => customer.userID === customerID
    );
    if (customerToUpdate) {
      try {
        // Create a new customer object with the updated status
        const updatedCustomer = { ...customerToUpdate, status: newStatus };
        console.log("console_data: customer", updatedCustomer);

        // Use updateCustomer API to update the customer
        await updateCustomer(updatedCustomer, token); // Pass the updated customer object

        // Update the state with the new customer data
        setCustomers((prevCustomers) =>
          prevCustomers.map((customer) =>
            customer.userID === customerID
              ? { ...customer, status: newStatus }
              : customer
          )
        );
      } catch (error) {
        console.error("Failed to update status", error);
      }
    }
  };

  if (loading) {
    return (
      <Box>
        <CircularProgress />
        <Typography>Loading customers...</Typography>
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
      <Typography variant="h4" gutterBottom>
        Customer List
      </Typography>
      <TextField
        label="Search Customers"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchTerm}
        onChange={handleSearchChange} // Update the search term on input change
      />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Telegram Username</TableCell>
            <TableCell>Date Registered</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredCustomers.length > 0 ? (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.userID}>
                <TableCell>{customer.userFName}</TableCell>
                <TableCell>{customer.userLName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.telegramUserName}</TableCell>
                <TableCell>
                  {new Date(customer.dateRegistered).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <Select
                      fullWidth
                      value={customer.status} // Display the current status
                      onChange={(event) =>
                        handleStatusChange(event, customer.userID)
                      } // Handle status change
                    >
                      <MenuItem value="New">New</MenuItem>
                      <MenuItem value="InProgress">InProgress</MenuItem>
                      <MenuItem value="Contacted">Contacted</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(customer.userID)}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7}>
                <Typography>No customers found</Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default ListCustomers;
