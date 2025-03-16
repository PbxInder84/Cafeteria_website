import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import Review from './Review';
import ReviewSummary from './ReviewSummary';
import ReviewFilter from './ReviewFilter';
import Message from '../Message';

const ReviewsContainer = styled.div`
  margin-top: 2rem;
`;

const ReviewsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  
  h3 {
    font-weight: 700;
    color: #333;
    margin-bottom: 0;
  }
`;

const ReviewList = ({ reviews, title = 'Reviews', showVerified = false, showSummary = true, showFilters = true }) => {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [filters, setFilters] = useState({
    rating: '',
    sortBy: 'newest'
  });
  
  useEffect(() => {
    // Apply filters and sorting
    let result = [...reviews];
    
    // Filter by rating
    if (filters.rating) {
      const minRating = parseInt(filters.rating);
      result = result.filter(review => review.rating >= minRating);
    }
    
    // Sort reviews
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'highest':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'lowest':
        result.sort((a, b) => a.rating - b.rating);
        break;
      default:
        break;
    }
    
    setFilteredReviews(result);
  }, [reviews, filters]);
  
  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };
  
  const handleReset = () => {
    setFilters({
      rating: '',
      sortBy: 'newest'
    });
  };
  
  return (
    <ReviewsContainer>
      <ReviewsHeader>
        <h3>{title}</h3>
      </ReviewsHeader>
      
      {reviews.length === 0 ? (
        <Message>No reviews yet</Message>
      ) : (
        <>
          {showSummary && <ReviewSummary reviews={reviews} />}
          
          {showFilters && (
            <ReviewFilter 
              onFilter={handleFilter} 
              onReset={handleReset} 
            />
          )}
          
          <Row>
            {filteredReviews.map((review) => (
              <Col key={review._id} md={6} className="mb-4">
                <Review 
                  review={review} 
                  showAvatar={true}
                  showDate={true}
                  verified={showVerified && review.verified}
                />
              </Col>
            ))}
          </Row>
          
          {filteredReviews.length === 0 && (
            <Message>No reviews match your filters</Message>
          )}
        </>
      )}
    </ReviewsContainer>
  );
};

export default ReviewList; 