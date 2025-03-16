import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const RegisterForm = styled(Form)`
  .form-control {
    padding: 0.8rem;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .form-label {
    font-weight: 500;
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem;
    font-weight: 600;
    width: 100%;
    margin-top: 1rem;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const LoginLink = styled(Link)`
  color: #6c5ce7;
  font-weight: 600;
  
  &:hover {
    color: #5649c0;
  }
`;

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };

  return (
    <PageLayout title="Create Account" breadcrumbItems={[{ name: 'Register', link: '' }]}>
      <FormContainer>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <RegisterForm onSubmit={submitHandler}>
          <Form.Group controlId='name' className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter your name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword' className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Create Account
          </Button>
        </RegisterForm>

        <Row className='py-3'>
          <Col className="text-center">
            Already have an account?{' '}
            <LoginLink to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Sign In
            </LoginLink>
          </Col>
        </Row>
      </FormContainer>
    </PageLayout>
  );
};

export default RegisterScreen;
