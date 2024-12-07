import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

const WifiCoworking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mockup for form submission (e.g., call an API or handle in your app)
    if (name && email) {
      setShowSuccess(true);
      setShowError(false);
      // Here you would send the data to your backend or API
      console.log('Wi-Fi pass requested for:', name, email);
    } else {
      setShowError(true);
      setShowSuccess(false);
    }
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center">
          <i className="fas fa-wifi fa-5x mb-4"></i>
        </Col>
        <Col md={6}>
          <h2>Free Wi-Fi & Co-working</h2>
          <p>
            Enjoy a quiet and comfortable workspace with complimentary Wi-Fi, perfect for remote work, meetings, or simply unwinding with a coffee.
          </p>
          <p>
            Whether you're working on a project, attending virtual meetings, or just browsing the internet, our high-speed Wi-Fi and cozy co-working spaces provide the ideal environment to get things done.
          </p>
          <h4>Why Choose Our Co-working Space?</h4>
          <ul>
            <li>Fast and reliable Wi-Fi</li>
            <li>Comfortable seating with power outlets</li>
            <li>Perfect for solo work, group meetings, and creative collaboration</li>
            <li>Enjoy fresh coffee, snacks, and baked goods while you work</li>
          </ul>

          <h4>Get Your Wi-Fi Pass</h4>
          <p>To access our high-speed Wi-Fi, please fill out the form below to receive your Wi-Fi pass:</p>

          {showSuccess && <Alert variant="success">Wi-Fi pass request submitted successfully!</Alert>}
          {showError && <Alert variant="danger">Please fill in both fields to request the Wi-Fi pass.</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Request Wi-Fi Pass
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default WifiCoworking;
