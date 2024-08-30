import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Hospital Management System
        </Typography>
        <Button color="inherit" component={Link} to="/patients">Patients</Button>
        <Button color="inherit" component={Link} to="/opd-schedule">OPD Schedule</Button>
        <Button color="inherit" component={Link} to="/blood-inventory">Blood Inventory</Button>
        <Button color="inherit" component={Link} to="/inventory">Inventory</Button>
        <Button color="inherit" component={Link} to="/billing">Billing</Button>
        <Button color="inherit" component={Link} to="/login">Logout</Button>
        
        {/* Responsive Menu for Mobile */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem component={Link} to="/patients" onClick={handleMenuClose}>Patients</MenuItem>
          <MenuItem component={Link} to="/opd-schedule" onClick={handleMenuClose}>OPD Schedule</MenuItem>
          <MenuItem component={Link} to="/blood-inventory" onClick={handleMenuClose}>Blood Inventory</MenuItem>
          <MenuItem component={Link} to="/inventory" onClick={handleMenuClose}>Inventory</MenuItem>
          <MenuItem component={Link} to="/billing" onClick={handleMenuClose}>Billing</MenuItem>
          <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
