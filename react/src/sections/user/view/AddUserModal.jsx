import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};

const headerStyle = {
  marginBottom: '16px',
};

const inputStyle = {
  marginBottom: '16px',
};

function AddUserModal({ open, handleClose, handleCreate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (open) {
      fetchRoles();
    }
  }, [open]);

  const fetchRoles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/roles', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      console.log(response.data); 
      setRoles(response.data); 
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Failed to fetch roles'); 
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRoleChange = (e) => {
    setFormData({
      ...formData,
      roles: e.target.value,
    });
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const onCreate = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/users', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });

      console.log('User created successfully:', response.data);
      setFormData({ name: '', email: '', password: '', confirmPassword: '', roles: [] });
      toast.success('User created successfully!');
      handleCreate(response.data); 
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation errors:', error.response.data.errors);
        Object.values(error.response.data.errors).forEach((errors) => {
          errors.forEach((error) => toast.error(error));
        });
      } else {
        console.error('Error creating user:', error);
        toast.error('Error creating user');
      }
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2" sx={headerStyle}>
            Add New User
          </Typography>
          <Divider />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={inputStyle}
          />
          <TextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            type="email"
            sx={inputStyle}
          />
          <TextField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            sx={inputStyle}
          />
          <TextField
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            type="password"
            sx={inputStyle}
          />
          <TextField
            select
            label="Roles"
            name="roles"
            value={formData.roles}
            onChange={handleRoleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={inputStyle}
            SelectProps={{ multiple: true }}
          >
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            color="primary"
            onClick={onCreate}
            fullWidth
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create'}
          </Button>
        </Box>
      </Modal>
      <ToastContainer /> {/* Render the toast notifications */}
    </>
  );
}

export default AddUserModal;
