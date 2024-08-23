import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { registerUser, loginUser } from '../apiService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('ROLE_USER');
    const [message, setMessage] = useState('');
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerUser({ name, email, password, roles });
            if (response!=null) {
                const loginResponse = await loginUser({ username:name, password });
                toast.success('Registration successful! Logging in...');
                console.log(loginResponse);
                if (loginResponse) {
                    localStorage.setItem('token', loginResponse.token);
                    localStorage.setItem('user_id', loginResponse.user_id);
                    navigate('/?loggedIn=true'); 
                } else {
                    setMessage('Login failed: No token received');
                    toast.error('Login failed: No token received');
                }
            } else {
                setMessage(response.message || 'Registration failed');
                toast.error(response.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed');
            toast.error('Registration failed');
        }
    };

    return (
        <Container className="mt-4">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <h2 className="text-center mb-4">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaUser /> Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaEnvelope /> Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaLock /> Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select 
                                value={roles} 
                                onChange={(e) => setRoles(e.target.value)}
                            >
                                <option value="ROLE_USER">User</option>
                                <option value="ROLE_MANAGER">Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">Register</Button>
                    </Form>
                    <ToastContainer /> {}
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
