import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaProjectDiagram } from 'react-icons/fa';
import Header from 'src/layouts/dashboard/header';

const SProjects = () => {
  const [groupedProjects, setGroupedProjects] = useState({});

  useEffect(() => {
    fetch('http://127.0.0.1:8000/projects')
      .then((response) => response.json())
      .then((data) => setGroupedProjects(data))
      .catch((error) => console.error('Error fetching projects:', error));
  }, []);

  return (
    <>
      <Header />
      <Container style={{ marginTop: '80px' }}>
        <h2 className="mb-4">
          <FaProjectDiagram /> Student Projects
        </h2>
        {Object.keys(groupedProjects).map((program) => (
          <div key={program}>
            <h3
              style={{
                color: '#4A90E2', // Custom color
                fontSize: '1.8rem', // Larger font size
                fontWeight: 'bold', // Bold text
                textTransform: 'uppercase', // Uppercase letters
                letterSpacing: '2px', // Add some spacing between letters
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
                padding: '10px', // Padding around the text
                backgroundColor: '#f0f4f8', // Light background for contrast
                borderRadius: '8px', // Rounded corners
              }}
            >
              {program}
            </h3>
            <Row>
              {groupedProjects[program].map((project) => (
                <Col md={4} key={project.id}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>{project.title}</Card.Title>
                      <Card.Text>{project.description}</Card.Text>
                      {/* <Card.Text>
                        <strong>Status:</strong> {project.status}
                      </Card.Text> */}
                      <Button variant="primary">View Details</Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>
    </>
  );
};

export default SProjects;
