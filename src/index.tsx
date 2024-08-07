// src/index.tsx
import React from "react";
import ReactDOM from "react-dom";
import AppRoutes from "./routes"; // Adjust path as needed
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <AppRoutes /> {/* Your routes should be handled here */}
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
