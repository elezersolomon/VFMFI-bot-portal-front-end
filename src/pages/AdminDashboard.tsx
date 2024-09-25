import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  CircularProgress,
  useTheme,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import axios from "axios";
// Define types
interface UserData {
  role: string;
  count: number;
}

interface CustomerData {
  status: string;
  count: number;
}

const AdminDashboard: React.FC = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const theme = useTheme();

  // Fetch users and customers data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersResponse, customersResponse] = await Promise.all([
          axios.get("http://localhost:5000/api/users/stats"), // API endpoint for users data
          axios.get("http://localhost:5000/api/customers/stats"), // API endpoint for customers data
        ]);
        setUserData(usersResponse.data);
        setCustomerData(customersResponse.data);
      } catch (error) {
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Pie chart colors
  const COLORS = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.error.main,
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid container spacing={4}>
        {/* Pie Chart for Users */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              User Roles Distribution
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={userData}
                cx={200}
                cy={150}
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="count"
                nameKey="role"
                label={(entry) => entry.role}
              >
                {userData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        {/* Bar Chart for Customers */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Customer Status Distribution
            </Typography>
            <BarChart
              width={400}
              height={300}
              data={customerData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill={theme.palette.primary.main} />
            </BarChart>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
