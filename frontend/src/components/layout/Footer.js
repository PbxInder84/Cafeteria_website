import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2d3436;
  color: #fff;
  padding: 4rem 0 2rem;
`;

const FooterTitle = styled.h5`
  color: #fff;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 2px;
    background-color: #6c5ce7;
  }
`;

const FooterLink = styled(Link)`
  color: #dfe6e9;
  display: block;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6c5ce7;
    transform: translateX(5px);
    text-decoration: none;
  }
`;

const FooterText = styled.p`
  color: #dfe6e9;
  margin-bottom: 0.8rem;
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
  
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
    margin-right: 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #6c5ce7;
      transform: translateY(-5px);
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 2rem;
  margin-top: 3rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #b2bec3;
  
  a {
    color: #6c5ce7;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const NewsletterSection = styled.div`
  background-color: #1e272e;
  padding: 2rem 0;
  margin-bottom: 2rem;
  
  h4 {
    color: #fff;
    margin-bottom: 1rem;
  }
  
  p {
    color: #dfe6e9;
    margin-bottom: 1.5rem;
  }
  
  .form-control {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    padding: 0.8rem 1rem;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <Col lg={4} md={6} className="mb-5 mb-lg-0">
            <FooterTitle>About CaféDelight</FooterTitle>
            <FooterText>
              We are passionate about providing the best coffee experience with ethically sourced beans, freshly baked goods, and a welcoming atmosphere for work and relaxation.
            </FooterText>
            <SocialIcons>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-pinterest-p"></i>
              </a>
            </SocialIcons>
          </Col>
          <Col lg={2} md={6} className="mb-5 mb-lg-0">
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/products">Menu</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/contact">Contact</FooterLink>
          </Col>
          <Col lg={3} md={6} className="mb-5 mb-md-0">
            <FooterTitle>Services</FooterTitle>
            <FooterLink to="/services/custom-coffee">Custom Coffee Blends</FooterLink>
            <FooterLink to="/services/fresh-bakes">Freshly Baked Goods</FooterLink>
            <FooterLink to="/services/wifi-coworking">Wi-Fi & Co-working</FooterLink>
            <FooterLink to="/services/delivery">Delivery Service</FooterLink>
            <FooterLink to="/services/catering">Event Catering</FooterLink>
          </Col>
          <Col lg={3} md={6}>
            <FooterTitle>Contact Us</FooterTitle>
            <FooterText>
              <i className="fas fa-map-marker-alt mr-2"></i> 123 Coffee Street, New York, NY 10001
            </FooterText>
            <FooterText>
              <i className="fas fa-phone-alt mr-2"></i> +1 (555) 123-4567
            </FooterText>
            <FooterText>
              <i className="fas fa-envelope mr-2"></i> info@cafedelight.com
            </FooterText>
            <FooterText>
              <i className="fas fa-clock mr-2"></i> Mon-Fri: 7am - 9pm<br />
              <span className="ml-4">Sat-Sun: 8am - 10pm</span>
            </FooterText>
          </Col>
        </Row>
        <NewsletterSection>
          <Container>
            <Row className="justify-content-center">
              <Col md={8} lg={6} className="text-center">
                <h4>Subscribe to Our Newsletter</h4>
                <p>Stay updated with our latest offers, new products, and coffee tips.</p>
                <Form className="d-flex">
                  <Form.Control
                    type="email"
                    placeholder="Your email address"
                    className="me-2"
                  />
                  <Button type="submit" variant="primary">Subscribe</Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </NewsletterSection>
        <Copyright>
          <p>© {new Date().getFullYear()} CaféDelight. All Rights Reserved. Designed with <i className="fas fa-heart" style={{ color: '#e84393' }}></i> by <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer">YourName</a></p>
        </Copyright>
      </Container>
    </FooterContainer>
  );
};

export default Footer; 