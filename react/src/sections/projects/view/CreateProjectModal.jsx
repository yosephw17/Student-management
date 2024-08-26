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

function CreateProjectModal({ open, handleClose, handleCreate }) {
  const [formData, setFormData] = useState({ title: '', description: '', program_id: '' });
  const [loading, setLoading] = useState(false);
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    if (open) {
      fetchPrograms();
    }
  }, [open]);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/programs');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCreate = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/api/projects', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Project created successfully:', response.data);
      setFormData({ title: '', description: '', program_id: '' });
      toast.success('Project created successfully!'); // Show success message
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log('Validation errors:', error.response.data.errors);
      } else {
        console.error('Error creating project:', error);
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
            Create New Project
          </Typography>
          <Divider />
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={inputStyle}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            sx={inputStyle}
          />
          <TextField
            select
            label="Program"
            name="program_id"
            value={formData.program_id}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            margin="normal"
            sx={inputStyle}
          >
            {programs.map((program) => (
              <MenuItem key={program.id} value={program.id}>
                {program.name}
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

export default CreateProjectModal;
