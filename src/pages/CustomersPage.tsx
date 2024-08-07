import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
} from "@mui/material";

interface Customer {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  telegramUsername: string;
  address: string;
  isVFClient: boolean;
  contacted: boolean;
}

const CustomersPage: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("/customers.json")
      .then((response) => response.json())
      .then((data) => setCustomers(data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleCheckboxChange = (index: number) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index].contacted = !updatedCustomers[index].contacted;
    setCustomers(updatedCustomers);
    // You can add logic here to update the server if needed
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Telegram Username</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>VF Client</TableCell>
              <TableCell>Contacted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={index}>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.phoneNumber}</TableCell>
                <TableCell>{customer.telegramUsername}</TableCell>
                <TableCell>{customer.address}</TableCell>
                <TableCell>{customer.isVFClient ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={customer.contacted}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CustomersPage;
