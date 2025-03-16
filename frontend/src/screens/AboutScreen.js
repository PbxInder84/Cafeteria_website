import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Meta from '../components/layout/Meta';
import styled from 'styled-components';
import Breadcrumb from '../components/layout/Breadcrumb';

const AboutSection = styled.section`
  padding: 5rem 0;
`;

const AboutTitle = styled.h1`
  margin-bottom: 2rem;
  font-weight: 700;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 0;
    width: 70px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const AboutScreen = () => {
  return (
    <>
      <Meta title="About Us | CaféDelight" />
      <Breadcrumb items={[{ name: 'About Us', link: '' }]} />
      <AboutSection>
        <Container>
          <Row>
            <Col md={12}>
              <AboutTitle>About Us</AboutTitle>
              <p className="lead">
                CaféDelight was founded with a simple mission: to create a space where exceptional coffee, 
                delicious food, and a welcoming atmosphere come together to create memorable experiences.
              </p>
              
              <h3 className="mt-5">Our Story</h3>
              <p>
                Founded in 2015, CaféDelight began as a small coffee cart in the local farmers' market. 
                The overwhelming positive response to our carefully crafted coffee and homemade pastries 
                inspired us to open our first brick-and-mortar location in 2017.
              </p>
              
              <h3 className="mt-4">Our Philosophy</h3>
              <p>
                We believe that great coffee is an art form. From sourcing ethically grown beans to 
                perfecting our roasting process and training our baristas in the craft of extraction, 
                every step is handled with care and precision.
              </p>
              
              <h3 className="mt-4">Our Commitment</h3>
              <p>
                At CaféDelight, we're committed to sustainability and community. We source our ingredients 
                locally whenever possible, use eco-friendly packaging, and actively participate in community 
                events and initiatives.
              </p>
            </Col>
          </Row>
        </Container>
      </AboutSection>
    </>
  );
};

export default AboutScreen; 