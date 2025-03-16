import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Review from '../reviews/Review';

const TestimonialsSectionContainer = styled.section`
  padding: 5rem 0;
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

// Sample testimonials data
const testimonials = [
  {
    _id: '1',
    name: 'John Doe',
    rating: 5,
    comment: 'The coffee at CaféDelight is exceptional! The ambiance is perfect for both work and relaxation. Highly recommend their signature blends.',
    createdAt: '2023-01-15T12:00:00Z'
  },
  {
    _id: '2',
    name: 'Sarah Johnson',
    rating: 4,
    comment: 'Great place to work remotely. The Wi-Fi is reliable and the staff is very friendly. Their pastries are delicious too!',
    createdAt: '2023-02-20T14:30:00Z'
  },
  {
    _id: '3',
    name: 'Michael Brown',
    rating: 5,
    comment: 'I love their custom coffee blends! The baristas are knowledgeable and always help me find the perfect coffee for my taste.',
    createdAt: '2023-03-10T09:15:00Z'
  },
  {
    _id: '4',
    name: 'Emily Wilson',
    rating: 5,
    comment: 'The freshly baked goods are amazing! I stop by every morning for their croissants. The coffee is consistently excellent too.',
    createdAt: '2023-04-05T08:45:00Z'
  }
];

const TestimonialsSection = () => {
  return (
    <TestimonialsSectionContainer>
      <Container>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <Row>
          {testimonials.map((testimonial) => (
            <Col key={testimonial._id} md={6} lg={3} className="mb-4">
              <Review 
                review={testimonial}
                showAvatar={true}
                showDate={false}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </TestimonialsSectionContainer>
  );
};

export default TestimonialsSection; 