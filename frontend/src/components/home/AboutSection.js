import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AboutContainer = styled.section`
  padding: 6rem 0;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 70px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const AboutImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
`;

const AboutContent = styled.div`
  padding: 2rem 0;
  
  p {
    color: #666;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  ul {
    margin-bottom: 2rem;
    
    li {
      margin-bottom: 0.8rem;
      color: #666;
      
      i {
        color: #6c5ce7;
        margin-right: 10px;
      }
    }
  }
`;

const StyledButton = styled(Button)`
  padding: 0.75rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 30px;
  background-color: #6c5ce7;
  border-color: #6c5ce7;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5649c0;
    border-color: #5649c0;
    transform: translateY(-3px);
  }
`;

const AboutSection = () => {
  return (
    <AboutContainer>
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <AboutImage src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" alt="About CaféDelight" />
          </Col>
          <Col lg={6}>
            <AboutContent>
              <SectionTitle>Our Story</SectionTitle>
              <p className="mt-4">
                CaféDelight was born from a passion for exceptional coffee and a desire to create a space where people could gather, work, and enjoy life's simple pleasures. Founded in 2015, we've grown from a small corner shop to a beloved community hub.
              </p>
              <p>
                Our commitment to quality is unwavering. We source our beans ethically from small-scale farmers around the world, ensuring fair compensation and sustainable practices. Our in-house roasting process brings out the unique character of each origin.
              </p>
              <ul className="list-unstyled">
                <li><i className="fas fa-check-circle"></i> Ethically sourced ingredients</li>
                <li><i className="fas fa-check-circle"></i> Skilled baristas with professional training</li>
                <li><i className="fas fa-check-circle"></i> Community-focused events and initiatives</li>
                <li><i className="fas fa-check-circle"></i> Eco-friendly packaging and practices</li>
              </ul>
              <Link to="/about">
                <StyledButton>Learn More About Us</StyledButton>
              </Link>
            </AboutContent>
          </Col>
        </Row>
      </Container>
    </AboutContainer>
  );
};

export default AboutSection; 