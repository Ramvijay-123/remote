import React, { useState } from 'react';
import { Form, Button, Alert, Container, Row, Col, Spinner } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { registerUser, loginUser } from '../apiService';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Register = ({ setToken, setUserId }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState('ROLE_USER');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await registerUser({ name, email, password, roles });
            if (response != null) {
            
                const loginResponse = await loginUser({ username: name, password });
                toast.success('Registration successful! Logging in...');
                if (loginResponse) {
                    setToken(loginResponse.token);
                    setUserId(loginResponse.user_id);
                    setLoading(false);
                    navigate('/');
                } else {
                    setMessage('Login failed: No token received');
                    toast.error('Login failed: No token received');
                    setLoading(false);
                }
            } else {
                setMessage(response.message || 'Registration failed');
                toast.error(response.message || 'Registration failed');
                setLoading(false);
            }
        } catch (error) {
            console.error('Registration error:', error);
            setMessage('Registration failed');
            toast.error('Registration failed');
        }
    };

    return (
        <div className='vh-100 w-50'>
           <Container className="mt-4 border rounded border-light shadow-sm " style={{ backgroundColor: '#fff', maxWidth: '400px' }}>
            <Row className="justify-content-center">
                <Col>
                    <h2 className="text-center mb-2 mt-2">Register</h2>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label><FaUser className="me-2" />Username</Form.Label>
                            <Form.Control 
                                type="text" 
                                placeholder="Enter your username" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                                className="form-control-lg"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                placeholder="Enter your email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                className="form-control-lg"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label><FaLock className="me-2" />Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                placeholder="Enter your password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                className="form-control-lg"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3 ">
                            <Form.Label>Role</Form.Label>
                            <Form.Select 
                                value={roles} 
                                onChange={(e) => setRoles(e.target.value)}
                                className="form-control-lg"
                            >
                                <option value="ROLE_USER">User</option>
                                <option value="ROLE_MANAGER">Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100 btn-lg mb-3 mt-2">{loading===false?"Register":<Spinner></Spinner>}</Button>
                    </Form>
                    <ToastContainer/>
                </Col>
            </Row>
        </Container>
        </div>
        
    );
};

export default Register;
