import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Meta from '../components/layout/Meta';
import Button from '../components/ui/Button';

const NotFoundContainer = styled.div`
  padding: 5rem 0;
  text-align: center;
`;

const ErrorCode = styled.h1`
  font-size: 8rem;
  font-weight: 700;
  color: #6c5ce7;
  margin-bottom: 1rem;
`;

const ErrorTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
`;

const ErrorDescription = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto 2rem;
`;

const NotFoundScreen = () => {
  return (
    <Container>
      <Meta title="Page Not Found | CaféDelight" />
      <NotFoundContainer>
        <Row className="justify-content-center">
          <Col md={8}>
            <ErrorCode>404</ErrorCode>
            <ErrorTitle>Page Not Found</ErrorTitle>
            <ErrorDescription>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </ErrorDescription>
            <Button to="/" variant="primary" size="lg" rounded>
              <i className="fas fa-home mr-2"></i> Back to Home
            </Button>
          </Col>
        </Row>
      </NotFoundContainer>
    </Container>
  );
};

export default NotFoundScreen; 