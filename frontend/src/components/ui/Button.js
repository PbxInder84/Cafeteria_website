import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

// Common styles for both button types
const buttonStyles = css`
  display: inline-block;
  padding: ${props => props.size === 'lg' ? '0.75rem 2rem' : '0.5rem 1.5rem'};
  font-size: ${props => props.size === 'lg' ? '1.1rem' : '0.9rem'};
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  
  /* Apply rounded corners if the rounded prop is true */
  border-radius: ${props => props.rounded ? '50px' : '5px'};
  
  /* Apply different styles based on variant */
  ${props => {
    if (props.variant === 'primary') {
      return `
        background-color: #6c5ce7;
        border-color: #6c5ce7;
        color: #fff;
        
        &:hover {
          background-color: #5649c0;
          border-color: #5649c0;
          transform: translateY(-3px);
        }
      `;
    } else if (props.variant === 'outline-primary') {
      return `
        background-color: transparent;
        border-color: #6c5ce7;
        color: #6c5ce7;
        
        &:hover {
          background-color: #6c5ce7;
          color: #fff;
          transform: translateY(-3px);
        }
      `;
    } else if (props.variant === 'outline-light') {
      return `
        background-color: transparent;
        border-color: #fff;
        color: #fff;
        
        &:hover {
          background-color: #fff;
          color: #333;
          transform: translateY(-3px);
        }
      `;
    }
  }}
`;

const StyledButton = styled.button`
  ${buttonStyles}
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

const Button = ({ 
  children, 
  to, 
  variant = 'primary', 
  size = 'md', 
  rounded = false,
  onClick,
  type = 'button',
  ...rest 
}) => {
  // Convert the rounded prop to a string for the DOM
  const buttonProps = {
    variant,
    size,
    rounded: rounded ? 'true' : undefined,
    ...rest
  };
  
  if (to) {
    return (
      <StyledLink to={to} {...buttonProps}>
        {children}
      </StyledLink>
    );
  }
  
  return (
    <StyledButton onClick={onClick} type={type} {...buttonProps}>
      {children}
    </StyledButton>
  );
};

export default Button; 