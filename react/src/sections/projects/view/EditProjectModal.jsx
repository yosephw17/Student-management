import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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

function EditProjectModal({ open, handleClose, project, handleSave }) {
  const [formData, setFormData] = useState({ ...project });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" sx={headerStyle}>
          Edit Project
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
          label="Program"
          name="program"
          value={formData.program}
          onChange={handleChange}
          fullWidth
          variant="outlined"
          margin="normal"
          sx={inputStyle}
        />
        <Button variant="contained" color="primary" onClick={onSave} fullWidth>
          Save
        </Button>
      </Box>
    </Modal>
  );
}

export default EditProjectModal;
