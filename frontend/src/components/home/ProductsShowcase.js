import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Product from '../Product';
import Loader from '../layout/Loader';
import Message from '../Message';

const ShowcaseSection = styled.section`
  padding: 5rem 0;
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

const ViewAllLink = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 2rem;
  font-weight: 600;
  color: #6c5ce7;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #5649c0;
    transform: translateY(-3px);
  }
  
  i {
    margin-left: 0.5rem;
  }
`;

const ProductsShowcase = ({ title, products, loading, error }) => {
  // Display only 4 products in the showcase
  const showcaseProducts = products?.slice(0, 4);
  
  return (
    <ShowcaseSection>
      <Container>
        <SectionTitle>{title}</SectionTitle>
        
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              {showcaseProducts.map((product) => (
                <Col key={product._id} sm={6} md={6} lg={3} className="mb-4">
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            
            <ViewAllLink to="/menu">
              View All Products <i className="fas fa-arrow-right"></i>
            </ViewAllLink>
          </>
        )}
      </Container>
    </ShowcaseSection>
  );
};

export default ProductsShowcase; 