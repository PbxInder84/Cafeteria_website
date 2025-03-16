import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  
  .star {
    color: #ffc107;
    margin-right: 2px;
  }
  
  .text {
    color: #777;
    font-size: 0.9rem;
    margin-left: 5px;
  }
`;

const Rating = ({ value, text, color }) => {
  return (
    <RatingContainer>
      {[1, 2, 3, 4, 5].map((index) => (
        <span key={index} className="star">
          <i
            style={{ color }}
            className={
              value >= index
                ? 'fas fa-star'
                : value >= index - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}
      {text && <span className="text">{text}</span>}
    </RatingContainer>
  );
};

Rating.defaultProps = {
  color: '#ffc107',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
};

export default Rating; 