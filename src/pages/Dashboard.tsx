// Frontend: src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import axios from "axios";

interface StatsData {
  usersCount: number;
  customersCount: number;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<StatsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/stats"
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
    fetchData();
  }, []);

  if (!stats) {
    return <Typography>Loading data...</Typography>;
  }

  const pieData = [
    { name: "Users", value: stats.usersCount },
    { name: "Customers", value: stats.customersCount },
  ];

  const barData = [
    { name: "Users", count: stats.usersCount },
    { name: "Customers", count: stats.customersCount },
  ];

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      {/* Pie Chart */}
      <Typography variant="h6" gutterBottom>
        Users vs Customers
      </Typography>
      <PieChart width={400} height={400}>
        <Pie
          data={pieData}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Bar Chart */}
      <Typography variant="h6" gutterBottom>
        Users and Customers Distribution
      </Typography>
      <BarChart
        width={500}
        height={300}
        data={barData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};

export default Dashboard;
