import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const FeaturesContainer = styled.section`
  padding: 5rem 0;
  background-color: #fff;
  position: relative;
  z-index: 2;
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

const FeatureCard = styled.div`
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  transition: all 0.3s ease;
  height: 100%;
  background-color: #fff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: #6c5ce7;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    
    i {
      font-size: 2rem;
      color: #fff;
    }
  }
  
  h3 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: #333;
  }
  
  p {
    color: #666;
    line-height: 1.6;
  }
`;

const FeaturesSection = () => {
  const features = [
    {
      icon: 'fas fa-coffee',
      title: 'Premium Coffee',
      description: 'We source the finest coffee beans from around the world to create our signature blends.'
    },
    {
      icon: 'fas fa-bread-slice',
      title: 'Fresh Bakes',
      description: 'Our pastries and bread are baked fresh daily using traditional recipes and quality ingredients.'
    },
    {
      icon: 'fas fa-wifi',
      title: 'Free Wi-Fi',
      description: 'Stay connected with our high-speed internet while enjoying your favorite coffee.'
    },
    {
      icon: 'fas fa-users',
      title: 'Community Space',
      description: 'We provide a welcoming environment for work, study, or simply relaxing with friends.'
    }
  ];
  
  return (
    <FeaturesContainer id="features">
      <Container>
        <SectionTitle>Why Choose Us</SectionTitle>
        <Row>
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={3} className="mb-4">
              <FeatureCard>
                <div className="icon">
                  <i className={feature.icon}></i>
                </div>
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