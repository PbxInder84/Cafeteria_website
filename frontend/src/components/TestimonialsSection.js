import React from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { FaStar } from 'react-icons/fa';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 5rem 0;
  background-color: #fff;
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

const TestimonialCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 2.5rem;
  margin: 0 1rem 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const QuoteText = styled.p`
  font-size: 1.1rem;
  font-style: italic;
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.7;
`;

const CustomerInfo = styled.div`
  margin-top: auto;
  
  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }
  
  h5 {
    font-weight: 600;
    margin-bottom: 0.3rem;
  }
  
  p {
    color: #777;
    font-size: 0.9rem;
  }
`;

const Stars = styled.div`
  color: #ffc107;
  margin-bottom: 1rem;
  
  svg {
    margin: 0 2px;
  }
`;

const StyledCarousel = styled(Carousel)`
  .carousel-indicators {
    bottom: -50px;
    
    button {
      background-color: #6c5ce7;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin: 0 5px;
    }
  }
  
  .carousel-control-prev,
  .carousel-control-next {
    width: 5%;
  }
`;

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Regular Customer',
      image: 'https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM=',
      quote: 'CaféDelight has become my go-to spot for both work and relaxation. Their custom coffee blends are unmatched, and the atmosphere is perfect for productivity.',
      stars: 5
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Freelance Designer',
      image: 'https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg',
      quote: 'As someone who works remotely, I appreciate the reliable Wi-Fi and comfortable seating. The staff remembers my usual order, which makes me feel like part of the family.',
      stars: 5
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Food Blogger',
      image: 'https://plus.unsplash.com/premium_photo-1690579805307-7ec030c75543?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uJTIwaWNvbnxlbnwwfHwwfHx8MA%3D%3D',
      quote: "The pastries are baked to perfection! I've tried many cafés in the city, and CaféDelight consistently delivers the best quality and flavor combinations.",
      stars: 4
    }
  ];

  return (
    <TestimonialsContainer>
      <Container>
        <SectionTitle>What Our Customers Say</SectionTitle>
        <Row className="justify-content-center">
          <Col md={10}>
            <StyledCarousel indicators interval={5000}>
              {testimonials.map((testimonial) => (
                <Carousel.Item key={testimonial.id}>
                  <TestimonialCard>
                    <Stars>
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </Stars>
                    <QuoteText>"{testimonial.quote}"</QuoteText>
                    <CustomerInfo>
                      <img src={testimonial.image} alt={testimonial.name} />
                      <h5>{testimonial.name}</h5>
                      <p>{testimonial.role}</p>
                    </CustomerInfo>
                  </TestimonialCard>
                </Carousel.Item>
              ))}
            </StyledCarousel>
          </Col>
        </Row>
      </Container>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection; 