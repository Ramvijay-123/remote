import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import './css/Features.css'; 
import flowchart from '../../src/components/image/blank.png'; 
import projectImg from '../../src/components/image/projectImg.png';  
import taskImg from '../../src/components/image/taskImg.png';  
import progressImg from '../../src/components/image/progressImg.png';  
import viewImg from '../../src/components/image/viewImg.png';  

const features = [
    {
        title: 'Create and Manage Projects',
        description: 'Initiate new projects, set deadlines, and manage all aspects of your projects seamlessly.',
        image: projectImg
    },
    {
        title: 'Assign Tasks to Users',
        description: 'Easily delegate tasks to your team members and monitor their progress.',
        image: taskImg
    },
    {
        title: 'Track the Progress of Tasks',
        description: 'Keep an eye on ongoing tasks and make sure everything stays on schedule.',
        image: progressImg
    },
    {
        title: 'View All Tasks and Project Details',
        description: 'Get a comprehensive view of all tasks and project details in one place.',
        image: viewImg
    }
];

const Info = () => {
    return (
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h2 className="mb-4">Features of Our Website</h2>
                </Col>
            </Row>
            <Row>
                {features.map((feature, index) => (
                    <Col md={6} lg={3} className="mb-4" key={index}>
                        <Card className="shadow-sm h-100">
                            <Card.Body className="text-center d-flex flex-column align-items-center">
                                <div className="mb-3">
                                    <img 
                                        src={feature.image} 
                                        alt={feature.title} 
                                        className="img-fluid mb-2" 
                                        style={{ maxHeight: '150px', objectFit: 'cover' }} 
                                    />
                                </div>
                                <Card.Title>{feature.title}</Card.Title>
                                <Card.Text>
                                    {feature.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="mt-5 mb-5 d-flex justify-content-center">
                <Col className="text-center">
                    <h1 className="mb-4" style={{ fontWeight: 'bold' }}>WorkFlow</h1>
                    <img 
                        src={flowchart} 
                        alt="Feature Illustration" 
                        className="img-fluid rounded w-50"
                        style={{ backgroundColor: '#997cdc'}}
                    />
                </Col>
            </Row>
        </Container>
    );
};

export default Info;
