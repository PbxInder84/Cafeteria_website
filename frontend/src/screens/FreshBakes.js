import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const FreshBakes = () => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={6} className="text-center">
          <i className="fas fa-cookie-bite fa-5x mb-4"></i>
        </Col>
        <Col md={6}>
          <h2>Freshly Baked Goods</h2>
          <p>
            Indulge in our daily selection of pastries, bread, and desserts, made fresh every day with the finest ingredients. Our expert bakers use time-honored techniques to create mouthwatering delights that are perfect for any time of the day.
          </p>
          <p>
            From soft, flaky croissants to hearty artisan breads and decadent cakes, we offer a variety of baked goods that will satisfy every craving. Whether you're looking for something savory or sweet, there's something for everyone.
          </p>

          <h4>Our Specialties:</h4>
          <ul>
            <li>Freshly Baked Croissants & Danish Pastries</li>
            <li>Artisan Breads – Sourdough, Baguettes, and more</li>
            <li>Decadent Cakes and Cupcakes for all occasions</li>
            <li>Homemade Cookies and Brownies</li>
            <li>Seasonal Specials – try our pumpkin spice cakes or fruit tarts</li>
          </ul>

          <Button variant="primary" href="/order-now" className="mt-3">
            Order Your Fresh Bakes
          </Button>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Croissants & Pastries</Card.Title>
              <Card.Text>
                Enjoy the buttery, flaky goodness of our freshly baked croissants and pastries, available in both sweet and savory varieties.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Artisan Breads</Card.Title>
              <Card.Text>
                From crusty baguettes to soft sourdough, our artisan breads are made with love and baked to perfection every day.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Cakes & Cupcakes</Card.Title>
              <Card.Text>
                Indulge in our moist cakes and cupcakes, perfect for celebrations, or simply as a sweet treat. Available in various flavors and designs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FreshBakes;
