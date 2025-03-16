import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const ContactContainer = styled.section`
  padding: 6rem 0;
  background-color: #f8f9fa;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const ContactForm = styled(Form)`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  .form-control {
    border: 1px solid #e1e1e1;
    padding: 0.8rem 1rem;
    margin-bottom: 1.5rem;
    border-radius: 5px;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  textarea.form-control {
    min-height: 150px;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #6c5ce7;
  border-color: #6c5ce7;
  padding: 0.8rem 2rem;
  font-weight: 600;
  border-radius: 5px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5649c0;
    border-color: #5649c0;
    transform: translateY(-3px);
  }
`;

const ContactInfo = styled.div`
  background-color: #fff;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const ContactItem = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  
  svg {
    color: #6c5ce7;
    font-size: 1.5rem;
    margin-right: 1rem;
    min-width: 1.5rem;
  }
  
  div {
    h5 {
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    
    p {
      color: #666;
      margin-bottom: 0;
    }
  }
`;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  margin-top: 3rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
`;

const StaticMap = styled.div`
  height: 100%;
  width: 100%;
  background-color: #e9ecef;
  background-image: url('/images/static-map.jpg');
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.1);
  }
`;

const MapPin = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  
  .pin {
    width: 30px;
    height: 30px;
    background-color: #6c5ce7;
    border-radius: 50% 50% 50% 0;
    transform: rotate(-45deg);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    
    &::after {
      content: '';
      width: 14px;
      height: 14px;
      background-color: white;
      border-radius: 50%;
    }
  }
  
  .pulse {
    background: rgba(108, 92, 231, 0.3);
    border-radius: 50%;
    height: 50px;
    width: 50px;
    position: absolute;
    left: -10px;
    top: -10px;
    transform: rotate(0);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }
`;

const MapInfo = styled.div`
  position: absolute;
  bottom: 20px;
  left: 20px;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 300px;
  z-index: 10;
  
  h5 {
    font-weight: 600;
    margin-bottom: 5px;
    color: #333;
  }
  
  p {
    margin-bottom: 0;
    font-size: 0.9rem;
    color: #666;
  }
  
  .directions {
    display: inline-block;
    margin-top: 10px;
    color: #6c5ce7;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message
    alert('Thank you for your message! We will get back to you soon.');
  };
  
  return (
    <ContactContainer>
      <Container>
        <SectionTitle>Get In Touch</SectionTitle>
        <Row>
          <Col lg={7} className="mb-5 mb-lg-0">
            <ContactForm onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control 
                  type="text" 
                  placeholder="Your Name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control 
                  type="email" 
                  placeholder="Your Email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control 
                  type="text" 
                  placeholder="Subject" 
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control 
                  as="textarea" 
                  placeholder="Your Message" 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <SubmitButton type="submit">Send Message</SubmitButton>
            </ContactForm>
          </Col>
          <Col lg={5}>
            <ContactInfo>
              <h4 className="mb-4 fw-bold">Contact Information</h4>
              <ContactItem>
                <FaMapMarkerAlt />
                <div>
                  <h5>Our Location</h5>
                  <p>123 Coffee Street, Brew City, BC 10001</p>
                </div>
              </ContactItem>
              <ContactItem>
                <FaPhone />
                <div>
                  <h5>Phone Number</h5>
                  <p>+1 (555) 123-4567</p>
                </div>
              </ContactItem>
              <ContactItem>
                <FaEnvelope />
                <div>
                  <h5>Email Address</h5>
                  <p>info@cafedelight.com</p>
                </div>
              </ContactItem>
              <ContactItem>
                <FaClock />
                <div>
                  <h5>Opening Hours</h5>
                  <p>Mon-Fri: 7am - 9pm<br />Sat-Sun: 8am - 10pm</p>
                </div>
              </ContactItem>
            </ContactInfo>
          </Col>
        </Row>
        <MapContainer>
          <StaticMap>
            <MapPin>
              <div className="pulse"></div>
              <div className="pin"></div>
            </MapPin>
            <MapInfo>
              <h5>CaféDelight</h5>
              <p>123 Coffee Street, Brew City, BC 10001</p>
              <a 
                href="https://www.google.com/maps/search/?api=1&query=Coffee+Shop+New+York" 
                target="_blank" 
                rel="noopener noreferrer"
                className="directions"
              >
                Get Directions <i className="fas fa-arrow-right"></i>
              </a>
            </MapInfo>
          </StaticMap>
        </MapContainer>
      </Container>
    </ContactContainer>
  );
};

export default ContactSection; 