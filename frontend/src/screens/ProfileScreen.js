import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const ProfileContainer = styled(Row)`
  margin-top: 1rem;
`;

const ProfileForm = styled(Form)`
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
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    margin-top: 1rem;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const OrdersTable = styled(Table)`
  margin-top: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  
  thead {
    background-color: #f8f9fa;
    
    th {
      font-weight: 600;
      color: #333;
      padding: 1rem;
      border-bottom: none;
    }
  }
  
  tbody {
    tr {
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
      }
      
      td {
        padding: 1rem;
        vertical-align: middle;
      }
    }
  }
  
  .btn-details {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  .order-id {
    font-family: monospace;
    font-weight: 600;
  }
  
  .order-date {
    color: #666;
  }
  
  .order-total {
    font-weight: 700;
    color: #6c5ce7;
  }
  
  .badge-paid {
    background-color: #00b894;
    color: white;
  }
  
  .badge-not-paid {
    background-color: #d63031;
    color: white;
  }
  
  .badge-delivered {
    background-color: #00b894;
    color: white;
  }
  
  .badge-not-delivered {
    background-color: #fdcb6e;
    color: #333;
  }
`;

const ProfileSection = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: #6c5ce7;
    }
  }
`;

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
        if (success) {
          setSuccessMessage('Profile updated successfully');
          setTimeout(() => {
            setSuccessMessage(null);
          }, 3000);
        }
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <PageLayout 
      title="My Profile" 
      breadcrumbItems={[{ name: 'Profile', link: '' }]}
    >
      <ProfileContainer>
        <Col md={4}>
          <ProfileSection>
            <h2>User Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {successMessage && <Message variant='success'>{successMessage}</Message>}
            {loading && <Loader />}
            <ProfileForm onSubmit={submitHandler}>
              <Form.Group controlId='name' className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group controlId='email' className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type='email'
                  placeholder='Enter email'
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
                Update Profile
              </Button>
            </ProfileForm>
          </ProfileSection>
        </Col>
        <Col md={8}>
          <ProfileSection>
            <h2>My Orders</h2>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <Message variant='danger'>{errorOrders}</Message>
            ) : orders && orders.length === 0 ? (
              <Message>You have no orders yet</Message>
            ) : (
              <OrdersTable striped hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders && orders.map((order) => (
                    <tr key={order._id}>
                      <td className="order-id">{order._id}</td>
                      <td className="order-date">{order.createdAt.substring(0, 10)}</td>
                      <td className="order-total">${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="badge badge-paid">
                            {order.paidAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="badge badge-not-paid">Not Paid</span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className="badge badge-delivered">
                            {order.deliveredAt.substring(0, 10)}
                          </span>
                        ) : (
                          <span className="badge badge-not-delivered">Not Delivered</span>
                        )}
                      </td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm btn-details'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </OrdersTable>
            )}
          </ProfileSection>
        </Col>
      </ProfileContainer>
    </PageLayout>
  );
};

export default ProfileScreen;
