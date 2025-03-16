import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders } from '../actions/orderActions'
import PageLayout from '../components/layout/PageLayout'
import styled from 'styled-components'

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
  
  .badge-delivered {
    background-color: #00b894;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .badge-not-delivered {
    background-color: #d63031;
    color: white;
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
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  
  i {
    margin-right: 0.5rem;
  }
`;

const OrderListScreen = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const orderList = useSelector((state) => state.orderList)
  const { loading, error, orders } = orderList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders())
    } else {
      navigate('/login')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <PageLayout 
      title="Orders" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Orders', link: '' }
      ]}
    >
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : orders.length === 0 ? (
        <>
          <Message>
            No orders till now.{' '}
            <LinkContainer to="/">
              <Button variant="link">Go Back</Button>
            </LinkContainer>
          </Message>
        </>
      ) : (
        <OrdersTable striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="order-id">{order._id}</td>
                <td className="order-user">{order.user && order.user.name}</td>
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
                    <ActionButton variant="primary" className="btn-sm btn-details">
                      <i className="fas fa-eye"></i> Details
                    </ActionButton>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </OrdersTable>
      )}
    </PageLayout>
  )
}

export default OrderListScreen
