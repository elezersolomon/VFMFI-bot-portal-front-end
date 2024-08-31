// src/routes.tsx (example)
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
