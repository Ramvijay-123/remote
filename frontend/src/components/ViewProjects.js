import React, { useEffect, useState } from 'react';
import { getProjectsByManager, getTasksByProjectPageable } from '../apiService';
import { Table, Container, Spinner, Alert, Button, Row, Col, Card } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';

const ViewProjects = ({ token, userId }) => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showTasksForProject, setShowTasksForProject] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await getTasksByProjectPageable(userId, token, page);
                setProjects(response.content);
                setTotalPages(response.totalPages);
            } catch (error) {
                setError('Failed to load projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId, token, page]);

    const handlePageClick = (event) => {
        setPage(event.selected);
    };

    const handleProjectClick = (projectId) => {
        setShowTasksForProject(showTasksForProject === projectId ? null : projectId);
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    const cardStyle = {
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        transition: 'box-shadow 0.3s ease'
    };

    const iconStyle = {
        marginRight: '8px'
    };

    return (
        <Container className="mt-4 vh-100">
            <h2 className="mb-4 text-bold">My Projects</h2>
            {showTasksForProject !== null && (
                <Button
                    variant="warning"
                    onClick={() => setShowTasksForProject(null)}
                    className="mb-3"
                >
                    <i className="bi bi-arrow-left-circle" style={iconStyle}></i> Back to Projects
                </Button>
            )}
            
            {showTasksForProject === null ? (
                <>
                    <Table striped bordered hover responsive="md">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.map((project) => (
                                <tr key={project.id}>
                                    <td>{project.id}</td>
                                    <td>{project.name}</td>
                                    <td>
                                        <div className="project-description" dangerouslySetInnerHTML={{ __html: project.description }} />
                                    </td>
                                    <td>
                                        <Button 
                                            variant={showTasksForProject === project.id ? 'danger' : 'warning'} 
                                            onClick={() => handleProjectClick(project.id)}
                                        >
                                            {showTasksForProject === project.id ? (
                                                <>
                                                    <i className="bi bi-eye-slash" style={iconStyle}></i> Hide Tasks
                                                </>
                                            ) : (
                                                <>
                                                    <i className="bi bi-eye" style={iconStyle}></i> View Tasks
                                                </>
                                            )}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    {/* Pagination Controls */}
                    <div className="d-flex justify-content-center mt-4">
                        <ReactPaginate
                            previousLabel={'Previous'}
                            nextLabel={'Next'}
                            breakLabel={'...'}
                            pageCount={totalPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            pageClassName={'page-item'}
                            pageLinkClassName={'page-link'}
                            previousClassName={'page-item'}
                            previousLinkClassName={'page-link'}
                            nextClassName={'page-item'}
                            nextLinkClassName={'page-link'}
                            breakClassName={'page-item'}
                            breakLinkClassName={'page-link'}
                            activeClassName={'active'}
                        />
                    </div>
                </>
            ) : (
                <div>
                    {projects.find(project => project.id === showTasksForProject)?.tasks.length > 0 ? (
                        <Row className="g-4">
                            {projects.find(project => project.id === showTasksForProject).tasks.map(task => (
                                <Col key={task.id} md={4}>
                                    <Card
                                        style={cardStyle}
                                        className="shadow-sm border-0"
                                    >
                                        <Card.Body>
                                            <Card.Title>
                                                <i className="bi bi-file-earmark-text" style={iconStyle}></i> {task.name}
                                            </Card.Title>
                                            <Card.Subtitle className="mb-2 text-muted">
                                                <i className="bi bi-calendar-date" style={iconStyle}></i> Due Date: {task.dueDate}
                                            </Card.Subtitle>
                                            <Card.Text className="mt-2" dangerouslySetInnerHTML={{ __html: task.description }} />
                                            <Card.Text className="mt-2">
                                                <i className={`bi ${task.status === 'Completed' ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}`} style={iconStyle}></i> Status: {task.status}
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : (
                        <p>No tasks found for this project.</p>
                    )}
                </div>
            )}
        </Container>
    );
};

export default ViewProjects;
