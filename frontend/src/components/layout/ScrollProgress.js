import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background-color: #6c5ce7;
  transform-origin: 0%;
  transform: scaleX(${props => props.progress});
  z-index: 1001;
  transition: transform 0.1s;
`;

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      
      if (totalHeight) {
        setProgress(scrollPosition / totalHeight);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return <ProgressBar progress={progress} />;
};

export default ScrollProgress; 