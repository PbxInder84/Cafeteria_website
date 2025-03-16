import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import styled from 'styled-components';

const StyledCard = styled(BootstrapCard)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  ${props => props.hover && `
    &:hover {
      transform: translateY(-10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }
  `}
  
  .card-img-top {
    height: ${props => props.imageHeight || 'auto'};
    object-fit: cover;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-title {
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .card-text {
    color: #666;
  }
`;

const Card = ({ children, ...props }) => {
  return <StyledCard {...props}>{children}</StyledCard>;
};

export default Card; 