import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Badge } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/layout/Loader';
import { listOrders, deliverOrder } from '../actions/orderActions';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const PendingOrdersTable = styled(Table)`
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
  
  .order-id {
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .order-user {
    font-weight: 600;
    color: #333;
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
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .badge-not-paid {
    background-color: #d63031;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .badge-pending {
    background-color: #fdcb6e;
    color: #333;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .btn-details {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  .btn-deliver {
    background-color: #00b894;
    border-color: #00b894;
    
    &:hover {
      background-color: #00a885;
      border-color: #00a885;
    }
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  margin-right: 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const StatusBadge = styled(Badge)`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
`;

const PendingOrdersScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listOrders());
    }
    
    if (successDeliver) {
      dispatch({ type: ORDER_DELIVER_RESET });
    }
  }, [dispatch, navigate, userInfo, successDeliver]);
  
  const getPendingOrders = () => {
    if (!orders) return [];
    
    return orders.filter(
      (order) => order.isPaid && !order.isDelivered
    );
  };
  
  const deliverHandler = (orderId) => {
    if (window.confirm('Are you sure you want to mark this order as delivered?')) {
      dispatch(deliverOrder(orderId));
    }
  };
  
  return (
    <PageLayout 
      title="Pending Orders" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Pending Orders', link: '' }
      ]}
    >
      <h1>Pending Orders</h1>
      {loadingDeliver && <Loader />}
      {errorDeliver && <Message variant="danger">{errorDeliver}</Message>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : getPendingOrders().length === 0 ? (
        <Message variant="info">No pending orders</Message>
      ) : (
        <PendingOrdersTable striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>CUSTOMER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAYMENT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {getPendingOrders().map((order) => (
              <tr key={order._id}>
                <td className="order-id">{order._id}</td>
                <td className="order-user">
                  {order.user && order.user.name}
                  <div className="text-muted small">{order.shippingAddress.address}</div>
                </td>
                <td className="order-date">
                  {new Date(order.createdAt).toLocaleDateString()}
                  <div className="text-muted small">
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </td>
                <td className="order-total">${order.totalPrice.toFixed(2)}</td>
                <td>
                  {order.isPaid ? (
                    <StatusBadge bg="success">
                      Paid on {new Date(order.paidAt).toLocaleDateString()}
                    </StatusBadge>
                  ) : (
                    <StatusBadge bg="danger">Not Paid</StatusBadge>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <ActionButton variant="primary" className="btn-sm btn-details">
                      <i className="fas fa-eye"></i> Details
                    </ActionButton>
                  </LinkContainer>
                  <ActionButton
                    variant="success"
                    className="btn-sm btn-deliver"
                    onClick={() => deliverHandler(order._id)}
                  >
                    <i className="fas fa-truck"></i> Mark Delivered
                  </ActionButton>
                </td>
              </tr>
            ))}
          </tbody>
        </PendingOrdersTable>
      )}
    </PageLayout>
  );
};

export default PendingOrdersScreen; 