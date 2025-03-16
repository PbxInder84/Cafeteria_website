import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const ShippingForm = styled(Form)`
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

const StyledCheckoutSteps = styled(CheckoutSteps)`
  margin-bottom: 2rem;
`;

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Redirect to login if not logged in
  useEffect(() => {
    if (!userInfo) {
      navigate('/login?redirect=shipping');
    }
  }, [userInfo, navigate]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate('/payment');
  };
  
  return (
    <PageLayout 
      title="Shipping Address" 
      breadcrumbItems={[
        { name: 'Cart', link: '/cart' },
        { name: 'Shipping', link: '' }
      ]}
    >
      <StyledCheckoutSteps step1 step2 />
      <FormContainer>
        <ShippingForm onSubmit={submitHandler}>
          <Form.Group controlId='address' className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter address'
              value={address}
              required
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='city' className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter city'
              value={city}
              required
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='postalCode' className="mb-3">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter postal code'
              value={postalCode}
              required
              onChange={(e) => setPostalCode(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='country' className="mb-3">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter country'
              value={country}
              required
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue to Payment
          </Button>
        </ShippingForm>
      </FormContainer>
    </PageLayout>
  );
};

export default ShippingScreen;
