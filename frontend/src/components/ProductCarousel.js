import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './layout/Loader';
import Message from './ui/Message';
import { listTopProducts } from '../actions/productActions';
import styled from 'styled-components';

const StyledCarousel = styled(Carousel)`
  margin-bottom: 3rem;
  
  .carousel-item {
    height: 400px;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7));
    }
  }
  
  .carousel-caption {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    
    h2 {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 1rem;
      
      @media (max-width: 768px) {
        font-size: 1.8rem;
      }
    }
    
    p {
      font-size: 1.2rem;
      margin-bottom: 1.5rem;
      
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
    
    .btn {
      background-color: #6c5ce7;
      border-color: #6c5ce7;
      padding: 0.6rem 1.5rem;
      font-weight: 600;
      
      &:hover {
        background-color: #5649c0;
        border-color: #5649c0;
      }
    }
  }
  
  img {
    height: 400px;
    object-fit: cover;
  }
`;

const ProductCarousel = () => {
  const dispatch = useDispatch();

  // Accessing the state of top-rated products from Redux store
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;

  // Fetch the top-rated products when the component mounts
  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  // Rendering loading state or error message if applicable
  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <StyledCarousel pause="hover" className="bg-dark">
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} (${product.price})
              </h2>
              <p>{product.description.substring(0, 100)}...</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </StyledCarousel>
  );
};

export default ProductCarousel;
