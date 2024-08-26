import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const EditUserModal = ({ open, handleClose, user, handleSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [roles, setRoles] = useState(user.roles);

  const availableRoles = ['Student', 'Instructor', 'Admin'];

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setRoles(user.roles);
    }
  }, [user]);

  const handleSubmit = () => {
    const updatedUser = {
      ...user,
      name,
      email,
      roles,
    };
    handleSave(updatedUser);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          type="text"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Roles"
          select
          fullWidth
          value={roles}
          onChange={(e) => setRoles(e.target.value)}
          SelectProps={{ multiple: true }}
        >
          {availableRoles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
