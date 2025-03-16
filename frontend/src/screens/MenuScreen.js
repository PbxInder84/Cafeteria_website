import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/layout/Loader';
import { listProducts } from '../actions/productActions';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';
import TextOverlay from '../components/ui/TextOverlay';

const CategoryTitle = styled.h2`
  margin-bottom: 2rem;
  font-weight: 700;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const MenuHeader = styled.div`
  margin-bottom: 3rem;
`;

const MenuScreen = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  
  // Filter products by category if a category is specified
  const filteredProducts = category 
    ? products.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      )
    : products;
  
  const categoryTitle = category 
    ? category.charAt(0).toUpperCase() + category.slice(1) 
    : 'All Menu Items';
  
  return (
    <PageLayout 
      title="Our Menu" 
      breadcrumbItems={[
        { name: 'Home', link: '/' },
        { name: 'Menu', link: '/menu' },
        category ? { name: categoryTitle, link: '' } : null
      ].filter(Boolean)}
    >
      <MenuHeader>
        <TextOverlay
          backgroundSrc="/images/menu-header.jpg"
          height="200px"
          overlayOpacity={0.7}
          justifyContent="center"
          alignItems="center"
        >
          <h1 className="text-white mb-0">{categoryTitle}</h1>
        </TextOverlay>
      </MenuHeader>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : filteredProducts.length === 0 ? (
        <Message>No products found in this category</Message>
      ) : (
        <Row>
          {filteredProducts.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3} className="mb-4">
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </PageLayout>
  );
};

export default MenuScreen; 