import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #2d3436;
  color: #f5f5f5;
  padding: 4rem 0 0;
`;

const FooterTitle = styled.h5`
  color: #fff;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  padding-bottom: 10px;
  
  &:after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 50px;
    height: 2px;
    background-color: #6c5ce7;
  }
`;

const FooterLink = styled(Link)`
  color: #ddd;
  display: block;
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6c5ce7;
    text-decoration: none;
    transform: translateX(5px);
  }
`;

const SocialIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  margin-right: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #6c5ce7;
    color: #fff;
    transform: translateY(-3px);
  }
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 1rem;
  
  svg {
    margin-right: 10px;
    color: #6c5ce7;
    min-width: 20px;
  }
`;

const Copyright = styled.div`
  background-color: #222;
  padding: 1.5rem 0;
  margin-top: 3rem;
  text-align: center;
  
  p {
    margin-bottom: 0;
    color: #aaa;
  }
  
  a {
    color: #6c5ce7;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Container>
        <Row>
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <img src="/static/media/logo.007efb2c78cbed1f14c5.png" alt="CaféDelight Logo" style={{ width: '150px', marginBottom: '1.5rem' }} />
            <p>CaféDelight redefines the café experience by blending rich flavors with a warm atmosphere for indulgence, creativity, and community.</p>
            <SocialIcons>
              <SocialIcon href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebookF />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </SocialIcon>
              <SocialIcon href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </SocialIcon>
              <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedinIn />
              </SocialIcon>
            </SocialIcons>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <FooterTitle>Quick Links</FooterTitle>
            <FooterLink to="/">Home</FooterLink>
            <FooterLink to="/products">Menu</FooterLink>
            <FooterLink to="/blog">Blog</FooterLink>
            <FooterLink to="/cart">Cart</FooterLink>
            <FooterLink to="/login">My Account</FooterLink>
          </Col>
          
          <Col lg={3} md={6} className="mb-4 mb-lg-0">
            <FooterTitle>Our Services</FooterTitle>
            <FooterLink to="/services/custom-coffee">Custom Coffee</FooterLink>
            <FooterLink to="/services/fresh-bakes">Fresh Bakes</FooterLink>
            <FooterLink to="/services/wifi-coworking">Wi-Fi & Coworking</FooterLink>
            <FooterLink to="/cart">Online Ordering</FooterLink>
            <FooterLink to="/contact">Catering Services</FooterLink>
          </Col>
          
          <Col lg={3} md={6}>
            <FooterTitle>Contact Us</FooterTitle>
            <ContactItem>
              <FaMapMarkerAlt />
              <p>123 Coffee Street, Brew City, BC 10001</p>
            </ContactItem>
            <ContactItem>
              <FaPhone />
              <p>+1 (555) 123-4567</p>
            </ContactItem>
            <ContactItem>
              <FaEnvelope />
              <p>info@cafedelight.com</p>
            </ContactItem>
            <ContactItem>
              <FaClock />
              <p>Mon-Fri: 7am - 9pm<br />Sat-Sun: 8am - 10pm</p>
            </ContactItem>
          </Col>
        </Row>
      </Container>
      
      <Copyright>
        <Container>
          <p>
            &copy; {new Date().getFullYear()} CaféDelight. All Rights Reserved. Designed with ❤️ by <a href="#" target="_blank" rel="noopener noreferrer">YourName</a>
          </p>
        </Container>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
