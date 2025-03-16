import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Button from '../ui/Button';

const CTAContainer = styled.section`
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), 
              url(${props => props.backgroundImage}) center/cover no-repeat;
  padding: 6rem 0;
  color: #fff;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
`;

const CTAContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  
  h2 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    
    @media (max-width: 768px) {
      font-size: 2.2rem;
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
    position: relative;
    z-index: 15;
  }
`;

const CTASection = ({ title, description, buttonText, buttonLink, backgroundImage }) => {
  return (
    <CTAContainer backgroundImage={backgroundImage}>
      <Container>
        <Row>
          <Col>
            <CTAContent>
              <h2>{title}</h2>
              <p>{description}</p>
              <div className="btn-container">
                <Button 
                  to={buttonLink} 
                  variant="primary" 
                  size="lg" 
                  rounded="true"
                >
                  {buttonText}
                </Button>
              </div>
            </CTAContent>
          </Col>
        </Row>
      </Container>
    </CTAContainer>
  );
};

export default CTASection; 