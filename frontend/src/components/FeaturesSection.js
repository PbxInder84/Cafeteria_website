import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaCoffee, FaWifi, FaBirthdayCake, FaLeaf } from 'react-icons/fa';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 5rem 0;
  background-color: #f8f9fa;
`;

const FeatureTitle = styled.h2`
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

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem 1.5rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
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
    line-height: 1.6;
  }
`;

const FeaturesSection = () => {
  const features = [
    {
      icon: <FaCoffee className="icon" />,
      title: 'Premium Coffee',
      description: 'Sourced from the finest beans around the world, our coffee offers a rich and unforgettable experience.'
    },
    {
      icon: <FaWifi className="icon" />,
      title: 'Free Wi-Fi & Workspace',
      description: 'Enjoy complimentary high-speed internet and comfortable workspaces perfect for productivity.'
    },
    {
      icon: <FaBirthdayCake className="icon" />,
      title: 'Fresh Bakes Daily',
      description: 'Our in-house bakery creates delicious pastries and cakes fresh every morning.'
    },
    {
      icon: <FaLeaf className="icon" />,
      title: 'Eco-Friendly',
      description: "We're committed to sustainable practices with biodegradable packaging and locally sourced ingredients."
    }
  ];

  return (
    <FeaturesContainer>
      <Container>
        <FeatureTitle>Why Choose CaféDelight</FeatureTitle>
        <Row>
          {features.map((feature, index) => (
            <Col md={6} lg={3} className="mb-4" key={index}>
              <FeatureCard>
                {feature.icon}
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </FeatureCard>
            </Col>
          ))}
        </Row>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection; 