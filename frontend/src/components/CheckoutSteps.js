import React from 'react'
import { Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import styled from 'styled-components'

const StepsContainer = styled(Nav)`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`

const Step = styled(Nav.Item)`
  position: relative;
  flex: 1;
  text-align: center;
  max-width: 200px;
  
  &:not(:last-child)::after {
    content: '';
    position: absolute;
    top: 50%;
    right: -10%;
    transform: translateY(-50%);
    width: 20%;
    height: 2px;
    background-color: ${props => props.active ? '#6c5ce7' : '#e1e1e1'};
    z-index: 0;
  }
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    &:not(:last-child)::after {
      display: none;
    }
  }
`

const StepLink = styled(Nav.Link)`
  padding: 0.5rem 1rem;
  border-radius: 50px;
  background-color: ${props => props.active ? '#6c5ce7' : '#f8f9fa'};
  color: ${props => props.active ? '#fff' : '#666'};
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:hover {
    background-color: ${props => props.active ? '#5649c0' : '#e9ecef'};
    color: ${props => props.active ? '#fff' : '#333'};
  }
  
  .step-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: ${props => props.active ? '#fff' : '#ddd'};
    color: ${props => props.active ? '#6c5ce7' : '#666'};
    font-size: 0.8rem;
    font-weight: 700;
    margin-right: 0.5rem;
  }
`

const CheckoutSteps = ({ step1, step2, step3, step4, className }) => {
  return (
    <StepsContainer className={className}>
      <Step active={step1}>
        <LinkContainer to='/login'>
          <StepLink active={step1}>
            <span className="step-number">1</span> Sign In
          </StepLink>
        </LinkContainer>
      </Step>

      <Step active={step2}>
        <LinkContainer to='/shipping'>
          <StepLink active={step2}>
            <span className="step-number">2</span> Shipping
          </StepLink>
        </LinkContainer>
      </Step>

      <Step active={step3}>
        <LinkContainer to='/payment'>
          <StepLink active={step3}>
            <span className="step-number">3</span> Payment
          </StepLink>
        </LinkContainer>
      </Step>

      <Step active={step4}>
        <LinkContainer to='/placeorder'>
          <StepLink active={step4}>
            <span className="step-number">4</span> Place Order
          </StepLink>
        </LinkContainer>
      </Step>
    </StepsContainer>
  )
}

export default CheckoutSteps
