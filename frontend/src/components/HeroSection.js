import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';

const HeroContainer = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
              url('/images/hero-bg.jpg') center/cover no-repeat;
  height: 80vh;
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: -1.5rem;
  margin-bottom: 2rem;
`;

const HeroContent = styled.div`
  text-align: center;
  
  h1 {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0.5rem 1rem 0.5rem;
  border-radius: 30px;
  transition: all 0.3s ease;
  
  &.primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  &.outline {
    background-color: transparent;
    border-color: #fff;
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
`;

const HeroSection = () => {
  return (
    <HeroContainer>
      <Container>
        <Row className="justify-content-center">
          <Col md={10}>
            <HeroContent>
              <h1>Experience the Perfect Blend</h1>
              <p>
                CaféDelight redefines the café experience by blending rich flavors with a warm atmosphere.
                Join us for indulgence, creativity, and community in every cup.
              </p>
              <div>
                <Link to="/products">
                  <StyledButton className="primary">Our Menu</StyledButton>
                </Link>
                <Link to="/services/custom-coffee">
                  <StyledButton className="outline">Custom Coffee</StyledButton>
                </Link>
              </div>
            </HeroContent>
          </Col>
        </Row>
      </Container>
    </HeroContainer>
  );
};

export default HeroSection; 