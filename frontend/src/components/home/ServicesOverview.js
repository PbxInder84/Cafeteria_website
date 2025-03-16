import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCoffee, FaCookieBite, FaWifi, FaTruck, FaBirthdayCake, FaUsers } from 'react-icons/fa';

const ServicesContainer = styled.section`
  padding: 6rem 0;
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

const ServiceCard = styled(Link)`
  display: block;
  background-color: #fff;
  border-radius: 10px;
  padding: 2.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  text-decoration: none;
  color: #333;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    color: #333;
  }
  
  svg {
    font-size: 3rem;
    color: #6c5ce7;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    color: #666;
    margin-bottom: 1.5rem;
  }
  
  .learn-more {
    color: #6c5ce7;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    
    i {
      margin-left: 5px;
      transition: all 0.3s ease;
    }
    
    &:hover i {
      transform: translateX(3px);
    }
  }
`;

const ServicesOverview = () => {
  const services = [
    {
      id: 1,
      icon: <FaCoffee />,
      title: 'Custom Coffee Blends',
      description: 'Experience unique flavors crafted to your preferences. Our baristas will help you discover your perfect blend.',
      link: '/services/custom-coffee'
    },
    {
      id: 2,
      icon: <FaCookieBite />,
      title: 'Freshly Baked Goods',
      description: 'Delicious pastries and baked goods prepared daily using traditional recipes and premium ingredients.',
      link: '/services/baked-goods'
    },
    {
      id: 3,
      icon: <FaWifi />,
      title: 'Co-working Space',
      description: 'A comfortable environment for work and leisure with high-speed internet and ergonomic seating arrangements.',
      link: '/services/co-working'
    },
    {
      id: 4,
      icon: <FaTruck />,
      title: 'Delivery Service',
      description: 'Enjoy our coffee and food delivered to your doorstep. Fast, reliable, and maintaining perfect temperature.',
      link: '/services/delivery'
    },
    {
      id: 5,
      icon: <FaBirthdayCake />,
      title: 'Event Catering',
      description: 'Make your special occasions memorable with our catering services. Custom menus tailored to your event.',
      link: '/services/catering'
    },
    {
      id: 6,
      icon: <FaUsers />,
      title: 'Coffee Workshops',
      description: 'Learn the art of coffee making from our experts. Regular workshops for beginners and enthusiasts alike.',
      link: '/services/workshops'
    }
  ];

  return (
    <ServicesContainer>
      <Container>
        <SectionTitle>Our Services</SectionTitle>
        <Row>
          {services.map((service) => (
            <Col lg={4} md={6} className="mb-4" key={service.id}>
              <ServiceCard to={service.link}>
                {service.icon}
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="learn-more">
                  Learn More <i className="fas fa-arrow-right"></i>
                </span>
              </ServiceCard>
            </Col>
          ))}
        </Row>
      </Container>
    </ServicesContainer>
  );
};

export default ServicesOverview; 