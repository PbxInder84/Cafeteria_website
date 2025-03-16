import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const CartItemCard = styled(ListGroup.Item)`
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
  
  .btn-remove {
    color: #e74c3c;
    background: transparent;
    border: none;
    transition: all 0.3s ease;
    
    &:hover {
      color: #c0392b;
      transform: scale(1.1);
    }
  }
`;

const SummaryCard = styled(Card)`
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
  
  .total-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #6c5ce7;
  }
  
  .btn-checkout {
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

const EmptyCartMessage = styled(Message)`
  text-align: center;
  padding: 3rem;
  
  h3 {
    margin-bottom: 1.5rem;
  }
  
  .btn {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem 2rem;
    font-weight: 600;
    margin-top: 1rem;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const CartScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const productId = id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=shipping');
  };

  return (
    <PageLayout 
      title="Your Shopping Cart" 
      breadcrumbItems={[
        { name: 'Home', link: '/' },
        { name: 'Cart', link: '' }
      ]}
    >
      <Row>
        <Col lg={8}>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/" className="btn btn-primary">
                Continue Shopping
              </Link>
            </EmptyCartMessage>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <CartItemCard key={item.product}>
                  <Row className="align-items-center">
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`} className="product-name">
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={2} className="product-price">
                      ${item.price}
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(Math.min(item.countInStock, 10)).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2} className="text-end">
                      <Button
                        type="button"
                        variant="light"
                        className="btn-remove"
                        onClick={() => removeFromCartHandler(item.product)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </CartItemCard>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col lg={4}>
          <SummaryCard>
            <Card.Header>
              Order Summary
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h5>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                  {cartItems.reduce((acc, item) => acc + item.qty, 0) === 1
                    ? 'item'
                    : 'items'})
                </h5>
                <div className="total-price mt-2">
                  ${cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </div>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-checkout"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </SummaryCard>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default CartScreen;
