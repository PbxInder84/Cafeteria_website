import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const OrderSummary = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: none;
  
  .card-header {
    background-color: #6c5ce7;
    color: #fff;
    font-weight: 700;
    padding: 1rem;
    border-radius: 10px 10px 0 0;
  }
  
  .list-group-item {
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .order-total {
    font-size: 1.5rem;
    font-weight: 700;
    color: #6c5ce7;
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem;
    font-weight: 600;
    width: 100%;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const OrderItem = styled(ListGroup.Item)`
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
  
  img {
    border-radius: 5px;
  }
  
  .product-name {
    font-weight: 600;
    color: #333;
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #6c5ce7;
    }
  }
  
  .product-price {
    font-weight: 700;
    color: #6c5ce7;
  }
`;

const OrderSection = styled.div`
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

const InfoCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: none;
  margin-bottom: 1.5rem;
  
  .card-header {
    background-color: #f8f9fa;
    font-weight: 700;
    padding: 1rem;
    border-bottom: 1px solid #eee;
  }
  
  .card-body {
    padding: 1rem;
  }
  
  p {
    margin-bottom: 0.5rem;
    
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  .payment-method {
    display: flex;
    align-items: center;
    
    i {
      font-size: 1.5rem;
      margin-right: 0.5rem;
      color: #6c5ce7;
    }
  }
  
  .alert {
    margin-bottom: 0;
  }
  
  .badge-success {
    background-color: #00b894;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
  
  .badge-danger {
    background-color: #d63031;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-weight: 600;
  }
`;

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // You can set this to your PayPal client ID or use an environment variable
  const paypalClientId = process.env.REACT_APP_PAYPAL_CLIENT_ID || 'sb'; // 'sb' is the sandbox client ID

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDeliver = useSelector((state) => state.orderDeliver);
  const { loading: loadingDeliver, success: successDeliver } = orderDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Calculate prices
  if (!loading && order) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    }
  }, [dispatch, orderId, successPay, successDeliver, order, userInfo, navigate]);

  const successPaymentHandler = (details) => {
    // Simulate successful payment
    const paymentResult = {
      id: details.id || 'fake_payment_id',
      status: details.status || 'COMPLETED',
      update_time: details.update_time || new Date().toISOString(),
      payer: details.payer || { email_address: userInfo.email },
    };
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(deliverOrder(order));
  };

  // Get the appropriate payment method icon
  const getPaymentIcon = (method) => {
    switch(method) {
      case 'PayPal':
        return <i className="fab fa-paypal"></i>;
      case 'Stripe':
        return <i className="fas fa-credit-card"></i>;
      case 'Cash':
        return <i className="fas fa-money-bill-wave"></i>;
      default:
        return <i className="fas fa-money-check"></i>;
    }
  };

  return (
    <PageLayout 
      title={order ? `Order #${order._id.substring(order._id.length - 8)}` : 'Order Details'} 
      breadcrumbItems={[
        { name: 'Orders', link: '/profile' },
        { name: 'Order Details', link: '' }
      ]}
    >
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : order && (
        <Row>
          <Col md={8}>
            <InfoCard>
              <Card.Header>Shipping Information</Card.Header>
              <Card.Body>
                <p>
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address:</strong> {order.shippingAddress.address},{' '}
                  {order.shippingAddress.city} {order.shippingAddress.postalCode},{' '}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant='success'>
                    Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                  </Message>
                ) : (
                  <Message variant='danger'>Not Delivered</Message>
                )}
              </Card.Body>
            </InfoCard>
            
            <InfoCard>
              <Card.Header>Payment Information</Card.Header>
              <Card.Body>
                <div className="payment-method">
                  {getPaymentIcon(order.paymentMethod)}
                  <span>
                    {order.paymentMethod === 'Cash'
                      ? 'Cash on Delivery'
                      : order.paymentMethod}
                  </span>
                </div>
                {order.isPaid ? (
                  <Message variant='success' className="mt-3">
                    Paid on {new Date(order.paidAt).toLocaleDateString()}
                  </Message>
                ) : (
                  <Message variant='danger' className="mt-3">Not Paid</Message>
                )}
              </Card.Body>
            </InfoCard>
            
            <OrderSection>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => (
                    <OrderItem key={index}>
                      <Row className="align-items-center">
                        <Col md={2}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col md={6}>
                          <Link to={`/product/${item.product}`} className="product-name">
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4} className="text-end product-price">
                          {item.qty} x ${item.price} = ${(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </OrderItem>
                  ))}
                </ListGroup>
              )}
            </OrderSection>
          </Col>
          <Col md={4}>
            <OrderSummary>
              <Card.Header>
                Order Summary
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col className="text-end">${order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Shipping</Col>
                    <Col className="text-end">${order.shippingPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col className="text-end">${order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col className="text-end order-total">${order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                
                {!order.isPaid && order.paymentMethod === 'PayPal' && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: order.totalPrice.toString(),
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions) => {
                          return actions.order.capture().then((details) => {
                            successPaymentHandler(details);
                          });
                        }}
                        style={{ layout: "vertical" }}
                      />
                    </PayPalScriptProvider>
                  </ListGroup.Item>
                )}
                
                {loadingDeliver && <Loader />}
                {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    <Button
                      type="button"
                      className="btn-block"
                      onClick={deliverHandler}
                    >
                      Mark As Delivered
                    </Button>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </OrderSummary>
          </Col>
        </Row>
      )}
    </PageLayout>
  );
};

export default OrderScreen;
