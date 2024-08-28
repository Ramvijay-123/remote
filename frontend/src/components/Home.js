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
                setTimeout(type, 80); // Adjust typing speed here
            }
        };

        setTimeout(type, 150); // Delay before typing starts

    }, []);

    return (
        <div className=''>
        <Container className="mt-5">
            <Row className="text-center">
                <Col>
                    <h1 style={{ fontSize: '2.5rem', color: '#fff', fontFamily: '"Bungee Tint", sans-serif' }}>
                        {displayedText}
                    </h1>
                    <p className="lead" style={{ fontSize: '1.4rem', color: '#fff' ,fontFamily: "'Baskervville SC', serif", fontWeight: 200}}>
                        Manage projects, assign tasks, and view your tasks efficiently on this platform.
                    </p>
                    <p className="mb-4" style={{ fontSize: '1.3rem', color: '#fff', fontFamily: "'Baskervville SC', serif", fontWeight: 200}}>
                        To get started, please register or log in to access the full features of the application.
                    </p>
                    <div className="mt-4">
                        <Button
                            variant=""
                            as={Link}
                            to="/register"
                            className='btn btn-outline-primary'
                            style={{ marginRight: '10px', backgroundColor: '', color:'#fff' }}
                        >
                            Register
                        </Button>
                        <Button
                           variant=''
                            className='btn btn-outline-warning'
                            as={Link}
                            to="/login"
                            style={{ color: '#fff' }}
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
