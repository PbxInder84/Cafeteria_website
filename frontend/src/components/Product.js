import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
import LazyImage from './ui/LazyImage';
import styled from 'styled-components';

const ProductCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.div`
  height: 200px;
  position: relative;
  z-index: 1; /* Set a lower z-index for the image container */
`;

const ProductInfo = styled(Card.Body)`
  padding: 1.5rem;
  position: relative;
  z-index: 2; /* Set a higher z-index for the text content */
  background-color: #fff;
`;

const ProductTitle = styled(Card.Title)`
  font-weight: 700;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
  
  a {
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #6c5ce7;
    }
  }
`;

const ProductPrice = styled.h3`
  font-weight: 700;
  color: #6c5ce7;
  margin: 0.5rem 0;
`;

const Product = ({ product }) => {
  return (
    <ProductCard>
      <Link to={`/product/${product._id}`}>
        <ProductImage>
          <LazyImage 
            src={product.image} 
            alt={product.name} 
            height="200px"
          />
        </ProductImage>
      </Link>
      
      <ProductInfo>
        <ProductTitle>
          <Link to={`/product/${product._id}`}>
            {product.name}
          </Link>
        </ProductTitle>
        
        <Rating
          value={product.rating}
          text={`${product.numReviews} reviews`}
        />
        
        <ProductPrice>${product.price}</ProductPrice>
      </ProductInfo>
    </ProductCard>
  );
};

export default Product;