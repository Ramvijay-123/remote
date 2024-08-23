import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Welcome to the Project Management App";

    useEffect(() => {
        let currentText = '';
        let index = 0;
        
        const type = () => {
            if (index < fullText.length) {
                currentText += fullText[index];
                setDisplayedText(currentText);
                index++;
                setTimeout(type, 200); // Adjust typing speed here
            }
        };

        setTimeout(type, 150); // Delay before typing starts

    }, []);

    return (
        <div className='vh-100'>
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 style={{ fontSize: '2.5rem', color: '#000' }}>
                        {displayedText}
                    </h1>
                    <p className="lead" style={{ fontSize: '1.2rem', color: '#343a40'}}>
                        Manage projects, assign tasks, and view your tasks efficiently on this platform.
                    </p>
                    <p className="mb-4" style={{ fontSize: '1rem', color: '#343a40'}}>
                        To get started, please register or log in to access the full features of the application.
                    </p>
                    <div className="mt-4">
                        <Button
                            variant=""
                            as={Link}
                            to="/register"
                            className='btn btn-warning'
                            style={{ marginRight: '10px', backgroundColor: '', borderColor: '#000', color:'#000' }}
                        >
                            Register
                        </Button>
                        <Button
                           variant=''
                            className='btn btn-outline-warning'
                            as={Link}
                            to="/login"
                            style={{ color: '#000' }}
                        >
                            Login
                        </Button>
                    </div>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
        </div>
    );
};

export default Home;
