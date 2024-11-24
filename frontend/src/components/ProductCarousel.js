import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Container, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopProducts } from '../actions/productActions';

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
    <Container className="mt-4">
      <Carousel pause="hover" className="home-slider-bg">
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} className="carousel-item-link">
              <div className="carousel-image-container">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fluid 
                  className="carousel-image" 
                />
              </div>
              <Carousel.Caption className="carousel-caption">
                <h2 className="carousel-title">
                  {product.name} (₹{product.price})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ProductCarousel;
