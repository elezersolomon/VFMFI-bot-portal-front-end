// src/App.tsx
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/index"; // Adjust the import path if needed
import AppRoutes from "./routes"; // Adjust the import path if needed
import theme from "./theme"; // Import your custom theme if any

const App: React.FC = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  </Provider>
);

export default App;
