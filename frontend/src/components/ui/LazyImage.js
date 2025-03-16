import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: ${props => props.height || 'auto'};
  overflow: hidden;
  background-color: #f5f5f5;
  z-index: 1;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: ${props => props.objectFit || 'cover'};
    transition: opacity 0.3s ease;
    opacity: ${props => props.loaded ? 1 : 0};
    position: relative;
    z-index: 2;
  }
`;

const Placeholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  
  &::after {
    content: '';
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #ddd;
    border-top-color: #6c5ce7;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LazyImage = ({ src, alt, height, objectFit, ...rest }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();
  
  useEffect(() => {
    // Store a reference to the current image element
    const currentImg = imgRef.current;
    
    if (currentImg && !loaded) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(currentImg);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(currentImg);
      
      // Use the stored reference in the cleanup function
      return () => {
        if (currentImg) {
          observer.unobserve(currentImg);
        }
      };
    }
  }, [loaded]);
  
  const handleLoad = () => {
    setLoaded(true);
  };
  
  return (
    <ImageContainer ref={imgRef} height={height} objectFit={objectFit} loaded={loaded} {...rest}>
      {!loaded && <Placeholder />}
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
        />
      )}
    </ImageContainer>
  );
};

export default LazyImage; 