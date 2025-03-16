import React from 'react';
import styled from 'styled-components';
import Rating from '../Rating';

const ReviewCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const ReviewInfo = styled.div`
  flex: 1;
  
  .reviewer-name {
    font-weight: 600;
    color: #333;
    margin-bottom: 0.25rem;
  }
  
  .review-date {
    font-size: 0.85rem;
    color: #666;
  }
`;

const ReviewContent = styled.div`
  color: #4a5568;
  line-height: 1.6;
  
  p {
    margin-bottom: 0;
  }
`;

const VerifiedBadge = styled.span`
  background-color: #00b894;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.5rem;
  border-radius: 50px;
  margin-left: 0.5rem;
  font-weight: 600;
`;

const Review = ({ review, showAvatar = true, showDate = true, verified = false }) => {
  // Get the first letter of the reviewer's name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  
  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <ReviewCard>
      <ReviewHeader>
        {showAvatar && (
          <Avatar>
            {getInitial(review.name)}
          </Avatar>
        )}
        <ReviewInfo>
          <div className="reviewer-name">
            {review.name}
            {verified && <VerifiedBadge>Verified Purchase</VerifiedBadge>}
          </div>
          <Rating value={review.rating} color="#f8e825" />
          {showDate && review.createdAt && (
            <div className="review-date">{formatDate(review.createdAt)}</div>
          )}
        </ReviewInfo>
      </ReviewHeader>
      <ReviewContent>
        <p>{review.comment}</p>
      </ReviewContent>
    </ReviewCard>
  );
};

export default Review; 