import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const FormTitle = styled.h3`
  font-weight: 700;
  color: #333;
  margin-bottom: 1.5rem;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const StyledForm = styled(Form)`
  .form-control, .form-select {
    padding: 0.8rem;
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .form-label {
    font-weight: 500;
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem 1.5rem;
    font-weight: 600;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const ReviewForm = ({ submitHandler, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [comment, setComment] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    submitHandler({ rating, comment });
    // Reset form
    setRating(0);
    setComment('');
  };
  
  return (
    <FormContainer>
      <FormTitle>Write a Review</FormTitle>
      <StyledForm onSubmit={handleSubmit}>
        <Form.Group controlId="rating" className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Select 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))}
            required
          >
            <option value="">Select...</option>
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </Form.Select>
        </Form.Group>
        
        <Form.Group controlId="comment" className="mb-3">
          <Form.Label>Comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience..."
            required
          />
        </Form.Group>
        
        <Button type="submit" variant="primary">
          Submit Review
        </Button>
      </StyledForm>
    </FormContainer>
  );
};

export default ReviewForm; 