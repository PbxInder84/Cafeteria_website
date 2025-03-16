import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import Meta from '../components/layout/Meta';
import styled from 'styled-components';
import Breadcrumb from '../components/layout/Breadcrumb';

const ContactSection = styled.section`
  padding: 5rem 0;
`;

const ContactTitle = styled.h1`
  margin-bottom: 2rem;
  font-weight: 700;
  color: #333;
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

const ContactInfo = styled.div`
  margin-bottom: 2rem;
  
  h3 {
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 0.5rem;
  }
  
  .icon {
    color: #6c5ce7;
    margin-right: 10px;
  }
`;

const ContactForm = styled(Form)`
  .form-control {
    border: 1px solid #e1e1e1;
    padding: 0.8rem;
    margin-bottom: 1.5rem;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.8rem 2rem;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const ContactScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const submitHandler = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, email, subject, message });
    // Reset form
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    alert('Thank you for your message! We will get back to you soon.');
  };
  
  return (
    <>
      <Meta title="Contact Us | CaféDelight" />
      <Breadcrumb items={[{ name: 'Contact', link: '' }]} />
      <ContactSection>
        <Container>
          <Row>
            <Col lg={5} md={6}>
              <ContactTitle>Get In Touch</ContactTitle>
              <p className="lead mb-5">
                We'd love to hear from you! Whether you have a question about our products, 
                services, or just want to say hello, we're here to help.
              </p>
              
              <ContactInfo>
                <h3>Contact Information</h3>
                <p><i className="fas fa-map-marker-alt icon"></i> 123 Coffee Street, Brewville, CA 90210</p>
                <p><i className="fas fa-phone icon"></i> (555) 123-4567</p>
                <p><i className="fas fa-envelope icon"></i> info@cafedelight.com</p>
                <p><i className="fas fa-clock icon"></i> Mon-Fri: 7am-8pm, Sat-Sun: 8am-9pm</p>
              </ContactInfo>
              
              <div className="social-links">
                <h3>Follow Us</h3>
                <a href="https://facebook.com/cafedelight" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/cafedelight" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="https://instagram.com/cafedelight" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="https://linkedin.com/company/cafedelight" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </Col>
            
            <Col lg={7} md={6} className="mt-5 mt-md-0">
              <h3>Send Us a Message</h3>
              <ContactForm onSubmit={submitHandler}>
                <Form.Group controlId="name">
                  <Form.Control 
                    type="text" 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group controlId="email">
                  <Form.Control 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group controlId="subject">
                  <Form.Control 
                    type="text" 
                    placeholder="Subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group controlId="message">
                  <Form.Control 
                    as="textarea" 
                    rows={5} 
                    placeholder="Your Message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Button type="submit" variant="primary">
                  Send Message
                </Button>
              </ContactForm>
            </Col>
          </Row>
        </Container>
      </ContactSection>
    </>
  );
};

export default ContactScreen; 