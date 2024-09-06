import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginUser } from '../apiService'; 

const Home = ({setToken, setUserId}) => {
    const [displayedText, setDisplayedText] = useState('');
    const fullText = "Welcome to the Project Management App";
    const navigate = useNavigate(); 
    useEffect(() => {
        let currentText = '';
        let index = 0;

        const type = () => {
            if (index < fullText.length) {
                currentText += fullText[index];
                setDisplayedText(currentText);
                index++;
                setTimeout(type, 80);
            }
        };

        setTimeout(type, 150);

    }, []);

    const handlesubmit = async () => { 
        try {
                const loginResponse = await loginUser({ username: "Crazy", password: "crazy12345" }); 
                toast.success('Registration successful! Logging in...');
                if (loginResponse) {
                    setToken(loginResponse.token);
                    setUserId(loginResponse.user_id);
                    console.log(loginResponse);
                    navigate('/'); 
                } else {
                    toast.error('Login failed: No token received');
                }
            
        } catch (error) {
            toast.error('Registration failed');
        }
    };

    return (
        <div>
            <Container className="mt-5">
                <Row className="text-center">
                    <Col>
                        <h1 style={{ fontSize: '2.5rem', color: '#fff', fontFamily: '"Bungee Tint", sans-serif' }}>
                            {displayedText}
                        </h1>
                        <p className="lead" style={{ fontSize: '1.4rem', color: '#fff', fontFamily: "'Baskervville SC', serif", fontWeight: 200 }}>
                            Manage projects, assign tasks, and view your tasks efficiently on this platform.
                        </p>
                        <p className="mb-4" style={{ fontSize: '1.3rem', color: '#fff', fontFamily: "'Baskervville SC', serif", fontWeight: 200 }}>
                            To get started, please register or log in to access the full features of the application.
                        </p>
                        <div className="mt-4">
                            <Button
                                variant=""
                                as={Link}
                                to="/register"
                                className='btn btn-outline-primary'
                                style={{ marginRight: '10px', backgroundColor: '', color: '#fff' }}
                            >
                                Register
                            </Button>
                            <Button
                                variant=""
                                className='btn btn-outline-warning'
                                as={Link}
                                to="/login"
                                style={{ color: '#fff' }}
                            >
                                Login
                            </Button>
                            <Button
                                variant=""
                                className='btn btn-info'
                                onClick={handlesubmit}
                                style={{ marginLeft: '10px' }}
                            >
                                Guest
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
