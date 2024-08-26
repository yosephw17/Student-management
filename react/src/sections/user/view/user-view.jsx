import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from 'axios';
import EditUserModal from './EditUserModal';
import AddUserModal from './AddUserModal';

export default function UserPage() {
  const [tabValue, setTabValue] = useState(0);
  const [users, setUsers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUser(null);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleSaveEdit = async (updatedUser) => {
    try {
      await axios.put(`http://localhost:8000/api/users/${updatedUser.id}`, updatedUser);
      fetchUsers();
      handleCloseEdit();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  const handleSaveAdd = (newUser) => {
    fetchUsers();
    handleCloseAdd();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const roles = ['Student', 'Instructor', 'Admin'];
  const filteredUsers = users.filter((user) =>
    user.roles.some((role) => roles[tabValue].toLowerCase() === role.toLowerCase())
  );

  return (
    <Container>
      <h2>User List</h2>
      <Button
        variant="contained"
        color="success"
        onClick={handleAdd}
        sx={{
          marginBottom: '16px',
        }}
      >
        Create New User
      </Button>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        {roles.map((role, index) => (
          <Tab label={role} key={index} />
        ))}
      </Tabs>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Roles</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.roles.join(', ')}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(user)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedUser && (
        <EditUserModal
          open={openEdit}
          handleClose={handleCloseEdit}
          user={selectedUser}
          handleSave={handleSaveEdit}
        />
      )}

      <AddUserModal open={openAdd} handleClose={handleCloseAdd} handleCreate={handleSaveAdd} />
    </Container>
  );
}
