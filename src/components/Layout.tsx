import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../store"; // Adjust the path as needed

interface LayoutProps {
  links: { to: string; text: string }[];
  role: string;
}

const Layout: React.FC<LayoutProps> = ({ links, role }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userFirstName = useSelector((state: RootState) => state.user.username);
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const handleSettings = () => {
    navigate(`/${role}/settings`);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ width: "100%", zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, pl: 2 }}>
            {role === "admin" ? "Admin Panel" : "User Panel"}
          </Typography>
          {userFirstName && (
            <Typography variant="h6" sx={{ mr: 2 }}>
              {userFirstName}
            </Typography>
          )}
          <IconButton edge="end" color="inherit" onClick={handleMenu}>
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleSettings}>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            top: "64px",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            zIndex: 1100,
            boxShadow: 3,
          },
        }}
      >
        <List>
          {links.map((link) => (
            <Paper
              key={link.to}
              elevation={3}
              sx={{
                my: 1,
                mx: 2,
                bgcolor: "primary.light",
                color: "primary.contrastText",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
            >
              <ListItem button component={Link} to={link.to}>
                <ListItemText primary={link.text} sx={{ pl: 4 }} />
              </ListItem>
            </Paper>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          p: 3,
          mt: "64px",
          ml: "240px",
        }}
      >
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            height: "calc(100vh - 64px)",
            width: "100%",
          }}
        >
          <Box
            sx={{
              p: 4,
              bgcolor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
              width: "100%",
              maxWidth: 1500,
            }}
          >
            <Outlet />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Layout;
