import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  
  .star {
    margin-right: 2px;
    color: #f8e825;
  }
  
  .text {
    margin-left: 5px;
    font-size: 0.9rem;
    color: #666;
  }
`

const Star = styled.span`
  margin-right: 0.2rem;
  color: ${props => props.color};
`

const Rating = ({ value = 0, text = '', color = '#f8e825' }) => {
  return (
    <RatingContainer>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} color={color}>
          <i
            className={
              value >= star
                ? 'fas fa-star'
                : value >= star - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </Star>
      ))}
      {text && <span className="text">{text}</span>}
    </RatingContainer>
  )
}

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  text: PropTypes.string,
  color: PropTypes.string,
}

export default Rating
