import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const CustomCoffee = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center">
          <i className="fas fa-coffee fa-5x mb-4"></i>
        </Col>
        <Col md={6}>
          <h2>Custom Coffee Blends</h2>
          <p>
            Discover the art of personalized coffee blends. Choose from a variety of beans, roasts, and flavors to craft the perfect cup that suits your taste. Whether you prefer bold and robust or smooth and subtle, we have something for everyone.
          </p>
          <p>
            Create your custom blend with our selection of single-origin beans and experiment with different roast profiles, from light and medium to dark roasts. Add flavoring options like vanilla, hazelnut, or caramel, and enjoy your signature coffee, roasted to perfection!
          </p>
          
          <h4>How it Works:</h4>
          <ol>
            <li>Select your base beans (choose from our single-origin options).</li>
            <li>Pick your preferred roast level (light, medium, dark).</li>
            <li>Add flavorings or spices if desired.</li>
            <li>We'll roast and blend it to your specification.</li>
          </ol>
          
          <Button variant="primary" href="/order-now" className="mt-3">
            Order Your Custom Blend
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Single-Origin Beans</Card.Title>
              <Card.Text>
                Choose from our selection of single-origin beans sourced from around the world for a unique flavor profile in every cup.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Flavor Options</Card.Title>
              <Card.Text>
                Add some delicious flavor options like vanilla, caramel, or chocolate to create a coffee that's uniquely yours.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Perfect Roast</Card.Title>
              <Card.Text>
                Choose your preferred roast: light, medium, or dark. We roast to your perfection.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomCoffee;
