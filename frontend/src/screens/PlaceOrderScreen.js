import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { createOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import { USER_DETAILS_RESET } from '../constants/userConstants';
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
  
  .btn-place-order {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem;
    font-weight: 600;
    width: 100%;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
    
    &:disabled {
      background-color: #a29bda;
      border-color: #a29bda;
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
`;

const StyledCheckoutSteps = styled(CheckoutSteps)`
  margin-bottom: 2rem;
`;

const PlaceOrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  if (!cart.shippingAddress.address) {
    navigate('/shipping');
  } else if (!cart.paymentMethod) {
    navigate('/payment');
  }

  // Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);
  cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)));
  cart.totalPrice = (
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice)
  ).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [navigate, success, order, dispatch]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  // Get the appropriate payment method icon
  const getPaymentIcon = () => {
    switch(cart.paymentMethod) {
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
      title="Place Order" 
      breadcrumbItems={[
        { name: 'Cart', link: '/cart' },
        { name: 'Shipping', link: '/shipping' },
        { name: 'Payment', link: '/payment' },
        { name: 'Place Order', link: '' }
      ]}
    >
      <StyledCheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <InfoCard>
            <Card.Header>Shipping Information</Card.Header>
            <Card.Body>
              <p>
                <strong>Address:</strong> {cart.shippingAddress.address},{' '}
                {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' '}
                {cart.shippingAddress.country}
              </p>
            </Card.Body>
          </InfoCard>
          
          <InfoCard>
            <Card.Header>Payment Method</Card.Header>
            <Card.Body>
              <div className="payment-method">
                {getPaymentIcon()}
                <span>
                  {cart.paymentMethod === 'Cash'
                    ? 'Cash on Delivery'
                    : cart.paymentMethod}
                </span>
              </div>
            </Card.Body>
          </InfoCard>
          
          <OrderSection>
            <h2>Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <ListGroup variant="flush">
                {cart.cartItems.map((item, index) => (
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
                  <Col className="text-end">${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col className="text-end">${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col className="text-end">${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col className="text-end order-total">${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {error && (
                <ListGroup.Item>
                  <Message variant="danger">{error}</Message>
                </ListGroup.Item>
              )}
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-place-order"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </OrderSummary>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default PlaceOrderScreen;
