import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const FormWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  margin: 2rem 0;
  
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1.5rem;
    font-weight: 600;
    color: #333;
  }
  
  .form-control {
    border: 1px solid #e1e1e1;
    padding: 0.8rem 1rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .form-label {
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .form-text {
    color: #666;
  }
`;

const FormContainer = ({ children, width = 'md' }) => {
  const getColSize = () => {
    switch (width) {
      case 'sm':
        return { md: 6, lg: 4 };
      case 'lg':
        return { md: 10, lg: 8 };
      case 'xl':
        return { md: 12, lg: 10 };
      case 'md':
      default:
        return { md: 8, lg: 6 };
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col {...getColSize()}>
          <FormWrapper>{children}</FormWrapper>
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer; 