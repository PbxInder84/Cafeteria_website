import React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(108, 92, 231, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
  }
`;

const StyledButton = styled.button`
  background-color: ${props => props.outline ? 'transparent' : '#6c5ce7'};
  color: ${props => props.outline ? '#6c5ce7' : '#fff'};
  border: 2px solid #6c5ce7;
  padding: ${props => props.size === 'lg' ? '0.8rem 2rem' : props.size === 'sm' ? '0.4rem 1rem' : '0.6rem 1.5rem'};
  font-size: ${props => props.size === 'lg' ? '1.1rem' : props.size === 'sm' ? '0.8rem' : '1rem'};
  font-weight: 600;
  border-radius: ${props => props.rounded ? '50px' : '5px'};
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-block;
  text-align: center;
  text-decoration: none;
  
  &:hover, &:focus {
    background-color: ${props => props.outline ? '#6c5ce7' : '#5649c0'};
    color: #fff;
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
  
  &:active {
    transform: translateY(-1px);
  }
  
  ${props => props.pulse && `
    animation: ${pulse} 2s infinite;
  `}
  
  ${props => props.block && `
    display: block;
    width: 100%;
  `}
  
  ${props => props.disabled && `
    opacity: 0.6;
    cursor: not-allowed;
    
    &:hover {
      transform: none;
      box-shadow: none;
    }
  `}
`;

const LinkButton = StyledButton.withComponent(Link);

const AnimatedButton = ({ 
  children, 
  to, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  rounded = false, 
  pulse = false, 
  block = false, 
  disabled = false,
  type = 'button',
  ...rest 
}) => {
  const outline = variant === 'outline';
  
  if (to) {
    return (
      <LinkButton 
        to={to} 
        outline={outline} 
        size={size} 
        rounded={rounded} 
        pulse={pulse} 
        block={block} 
        disabled={disabled}
        {...rest}
      >
        {children}
      </LinkButton>
    );
  }
  
  return (
    <StyledButton 
      onClick={onClick} 
      outline={outline} 
      size={size} 
      rounded={rounded} 
      pulse={pulse} 
      block={block} 
      disabled={disabled}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  );
};

export default AnimatedButton; 