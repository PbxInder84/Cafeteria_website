import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../ui/Button';

const HeroContainer = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
              url('/images/hero-bg.jpg') center/cover no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  color: #fff;
  position: relative;
  padding-top: 80px;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  color: #fff;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  max-width: 800px;
  
  h1 {
    font-size: 4rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    line-height: 1.2;
    text-transform: uppercase;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    span {
      color: #6c5ce7;
      text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
    }
  }
  
  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.8;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  
  .btn-container {
    display: flex;
    gap: 1rem;
    position: relative;
    z-index: 15;
    
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  z-index: 10;
  
  span {
    font-size: 0.9rem;
    margin-bottom: 8px;
    letter-spacing: 1px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }
  
  .mouse {
    width: 30px;
    height: 50px;
    border: 2px solid #fff;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    
    &::before {
      content: '';
      width: 4px;
      height: 10px;
      background-color: #fff;
      border-radius: 2px;
      animation: scroll 2s infinite;
      margin-top: 8px;
    }
  }
  
  @keyframes scroll {
    0% {
      transform: translateY(0);
      opacity: 1;
    }
    50% {
      transform: translateY(10px);
      opacity: 0.5;
    }
    100% {
      transform: translateY(20px);
      opacity: 0;
    }
  }
`;

const HeroSection = () => {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <HeroContainer>
      <Container>
        <Row>
          <Col lg={8} md={10}>
            <HeroContent>
              <h1>Experience The Perfect <span>Coffee</span> In Every Cup</h1>
              <p>
                Discover our artisanal coffee blends, freshly baked pastries, and a cozy atmosphere 
                designed for both productivity and relaxation. At CaféDelight, we're passionate about 
                creating memorable experiences through exceptional coffee and service.
              </p>
              <div className="btn-container">
                <Button 
                  to="/menu" 
                  variant="primary" 
                  size="lg" 
                  rounded="true"
                >
                  Explore Our Menu
                </Button>
                <Button 
                  to="/services/custom-coffee" 
                  variant="outline-light" 
                  size="lg" 
                  rounded="true"
                >
                  Custom Coffee
                </Button>
              </div>
            </HeroContent>
          </Col>
        </Row>
      </Container>
      
      <ScrollIndicator onClick={scrollToFeatures}>
        <span>SCROLL DOWN</span>
        <div className="mouse"></div>
      </ScrollIndicator>
    </HeroContainer>
  );
};

export default HeroSection; 