import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Rating from '../ui/Rating';
import styled from 'styled-components';

const ProductCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
    height: 48px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .card-text {
    color: #6c5ce7;
    font-weight: 700;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }
  
  .rating-container {
    margin-bottom: 0.5rem;
  }
`;

const ViewButton = styled(Link)`
  display: inline-block;
  margin-top: 1rem;
  padding: 0.5rem 1.5rem;
  background-color: #6c5ce7;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #5649c0;
    color: #fff;
    transform: translateY(-3px);
  }
`;

const Product = ({ product }) => {
  return (
    <ProductCard>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <div className="rating-container">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>
        <Card.Text>${product.price}</Card.Text>
        <ViewButton to={`/product/${product._id}`}>
          View Details
        </ViewButton>
      </Card.Body>
    </ProductCard>
  );
};

export default Product; 