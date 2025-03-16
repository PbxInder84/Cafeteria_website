import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const PaymentForm = styled(Form)`
  .form-check {
    padding: 1rem;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    margin-bottom: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: #6c5ce7;
      background-color: #f8f9fa;
    }
  }
  
  .form-check-input {
    margin-top: 0.3rem;
    
    &:checked {
      background-color: #6c5ce7;
      border-color: #6c5ce7;
    }
    
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(108, 92, 231, 0.25);
      border-color: #6c5ce7;
    }
  }
  
  .form-check-label {
    font-weight: 500;
    margin-left: 0.5rem;
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

const PaymentMethodIcon = styled.i`
  font-size: 1.5rem;
  margin-right: 0.5rem;
  color: #6c5ce7;
`;

const StyledCheckoutSteps = styled(CheckoutSteps)`
  margin-bottom: 2rem;
`;

const PaymentScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const navigate = useNavigate();
  
  if (!shippingAddress.address) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <PageLayout 
      title="Payment Method" 
      breadcrumbItems={[
        { name: 'Cart', link: '/cart' },
        { name: 'Shipping', link: '/shipping' },
        { name: 'Payment', link: '' }
      ]}
    >
      <StyledCheckoutSteps step1 step2 step3 />
      <FormContainer>
        <PaymentForm onSubmit={submitHandler}>
          <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
            <Col>
              <Form.Check
                type='radio'
                label={
                  <>
                    <PaymentMethodIcon className="fab fa-paypal" />
                    PayPal or Credit Card
                  </>
                }
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                checked={paymentMethod === 'PayPal'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label={
                  <>
                    <PaymentMethodIcon className="fas fa-credit-card" />
                    Stripe
                  </>
                }
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                checked={paymentMethod === 'Stripe'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
              <Form.Check
                type='radio'
                label={
                  <>
                    <PaymentMethodIcon className="fas fa-money-bill-wave" />
                    Cash on Delivery
                  </>
                }
                id='Cash'
                name='paymentMethod'
                value='Cash'
                checked={paymentMethod === 'Cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Continue to Place Order
          </Button>
        </PaymentForm>
      </FormContainer>
    </PageLayout>
  );
};

export default PaymentScreen;
