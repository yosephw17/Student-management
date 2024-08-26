import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
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
import EditProjectModal from './EditProjectModal';
import CreateProjectModal from './CreateProjectModal';

export default function ProductsView() {
  const [projects, setProjects] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/projects');
      setProjects(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleEdit = (project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
    setCreateModalOpen(false);
    setSelectedProject(null);
  };

  const handleSave = (updatedProject) => {
    console.log('Saved project:', updatedProject);
    fetchProjects();
  };

  const handleCreate = async (newProject) => {
    try {
      const response = await axios.post('http://localhost:8000/api/projects', newProject);
      setProjects((prevProjects) => [...prevProjects, response.data]); // Update state with the new project
      console.log('Created project:', response.data);
      handleClose(); 
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/projects/${id}`);
      console.log(`Deleted project with ID: ${id}`);
      fetchProjects(); 
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <Container>
      <h2>Project List</h2>
      <Button
        variant="contained"
        color="success"
        onClick={() => setCreateModalOpen(true)}
        sx={{
          marginBottom: '16px',
        }}
      >
        Create New Project
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Program</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell>{project.title}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.program}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleEdit(project)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(project.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {selectedProject && (
        <EditProjectModal
          open={modalOpen}
          handleClose={handleClose}
          project={selectedProject}
          handleSave={handleSave}
        />
      )}

      <CreateProjectModal
        open={createModalOpen}
        handleClose={handleClose}
        handleCreate={handleCreate}
      />
    </Container>
  );
}
