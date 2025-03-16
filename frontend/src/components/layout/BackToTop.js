import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const BackToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #6c5ce7;
  color: #fff;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: ${props => props.visible ? '1' : '0'};
  transform: ${props => props.visible ? 'translateY(0)' : 'translateY(20px)'};
  transition: all 0.3s ease;
  z-index: 999;
  
  &:hover {
    background-color: #5649c0;
  }
  
  &:focus {
    outline: none;
  }
`;

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);
  
  return (
    <BackToTopButton 
      visible={isVisible} 
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <i className="fas fa-arrow-up"></i>
    </BackToTopButton>
  );
};

export default BackToTop; 