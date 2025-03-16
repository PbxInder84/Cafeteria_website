import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

const FilterContainer = styled.div`
  background-color: #f8f9fa;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const FilterForm = styled(Form)`
  .form-select, .form-control {
    border: 1px solid #e1e1e1;
    border-radius: 5px;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  .btn-outline-secondary {
    color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #6c5ce7;
      color: white;
    }
  }
`;

const ReviewFilter = ({ onFilter, onReset }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const filters = {
      rating: formData.get('rating'),
      sortBy: formData.get('sortBy')
    };
    onFilter(filters);
  };
  
  return (
    <FilterContainer>
      <FilterForm onSubmit={handleSubmit}>
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="rating">
              <Form.Label>Filter by Rating</Form.Label>
              <Form.Select name="rating" defaultValue="">
                <option value="">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars & Up</option>
                <option value="3">3 Stars & Up</option>
                <option value="2">2 Stars & Up</option>
                <option value="1">1 Star & Up</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="sortBy">
              <Form.Label>Sort by</Form.Label>
              <Form.Select name="sortBy" defaultValue="newest">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="highest">Highest Rating</option>
                <option value="lowest">Lowest Rating</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4} className="d-flex">
            <Button type="submit" variant="primary" className="me-2">
              Apply Filters
            </Button>
            <Button type="button" variant="outline-secondary" onClick={onReset}>
              Reset
            </Button>
          </Col>
        </Row>
      </FilterForm>
    </FilterContainer>
  );
};

export default ReviewFilter; 