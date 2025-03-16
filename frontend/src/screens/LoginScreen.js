import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/layout/Loader';
import FormContainer from '../components/FormContainer';
import { login } from '../actions/userActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const LoginForm = styled(Form)`
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

const RegisterLink = styled(Link)`
  color: #6c5ce7;
  font-weight: 600;
  
  &:hover {
    color: #5649c0;
  }
`;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  // Get redirect parameter from URL query string
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || '';

  useEffect(() => {
    if (userInfo) {
      if (redirect) {
        navigate(`/${redirect}`);
      } else {
        navigate('/');
      }
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <PageLayout title="Sign In" breadcrumbItems={[{ name: 'Login', link: '' }]}>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <LoginForm onSubmit={submitHandler}>
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
              placeholder='Enter your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Sign In
          </Button>
        </LoginForm>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </PageLayout>
  );
};

export default LoginScreen;
