import React from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import styled from 'styled-components';
import Rating from '../Rating';

const SummaryContainer = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const AverageRating = styled.div`
  text-align: center;
  
  .rating-value {
    font-size: 3rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0.5rem;
  }
  
  .total-reviews {
    color: #666;
    margin-top: 0.5rem;
  }
`;

const RatingBreakdown = styled.div`
  margin-top: 1rem;
  
  .rating-row {
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  
  .rating-label {
    width: 60px;
    font-weight: 500;
  }
  
  .rating-bar {
    flex: 1;
    margin: 0 1rem;
  }
  
  .rating-count {
    width: 40px;
    text-align: right;
    color: #666;
  }
`;

const StyledProgressBar = styled(ProgressBar)`
  height: 8px;
  border-radius: 4px;
  
  .progress-bar {
    background-color: #6c5ce7;
  }
`;

const ReviewSummary = ({ reviews }) => {
  // Calculate average rating
  const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;
  
  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0]; // For 1-5 stars
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });
  
  return (
    <SummaryContainer>
      <Row>
        <Col md={4}>
          <AverageRating>
            <div className="rating-value">{averageRating.toFixed(1)}</div>
            <Rating value={averageRating} color="#f8e825" />
            <div className="total-reviews">{reviews.length} reviews</div>
          </AverageRating>
        </Col>
        <Col md={8}>
          <RatingBreakdown>
            {[5, 4, 3, 2, 1].map(stars => (
              <div key={stars} className="rating-row">
                <div className="rating-label">{stars} stars</div>
                <div className="rating-bar">
                  <StyledProgressBar 
                    now={reviews.length > 0 ? (ratingCounts[stars - 1] / reviews.length) * 100 : 0} 
                  />
                </div>
                <div className="rating-count">{ratingCounts[stars - 1]}</div>
              </div>
            ))}
          </RatingBreakdown>
        </Col>
      </Row>
    </SummaryContainer>
  );
};

export default ReviewSummary; 