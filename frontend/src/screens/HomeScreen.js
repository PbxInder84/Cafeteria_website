import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import Meta from '../components/layout/Meta';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ProductsShowcase from '../components/home/ProductsShowcase';
import TestimonialsSection from '../components/home/TestimonialsSection';
import AboutSection from '../components/home/AboutSection';
import ServicesOverview from '../components/home/ServicesOverview';
import BlogPreview from '../components/home/BlogPreview';
import ContactSection from '../components/home/ContactSection';
import CTASection from '../components/home/CTASection';
import { listProducts } from '../actions/productActions';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import styled from 'styled-components';
import Breadcrumb from '../components/layout/Breadcrumb';

const HomeScreen = () => {
  // Use React Router v6 hooks
  const params = useParams();
  const keyword = params.keyword || '';
  const pageNumber = params.pageNumber || 1;

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <>
          <HeroSection />
          <FeaturesSection />
          <AboutSection />
          <ProductsShowcase 
            title="Featured Products"
            products={products}
            loading={loading}
            error={error}
          />
          <CTASection 
            title="Create Your Perfect Coffee"
            description="Customize your coffee experience with our unique blends and brewing methods. Tell us your preferences, and we'll craft the perfect cup just for you."
            buttonText="Start Customizing"
            buttonLink="/services/custom-coffee"
            backgroundImage="/images/cta-bg.jpg"
          />
          <ServicesOverview />
          <BlogPreview />
          <ContactSection />
        </>
      ) : (
        <Container className="py-3">
          <Breadcrumb items={[{ name: `Search: ${keyword}`, link: '' }]} />
          <h1>Search Results for "{keyword}"</h1>
        </Container>
      )}
      
    </>
  );
};

export default HomeScreen;
