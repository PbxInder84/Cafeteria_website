import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

const CookieBanner = styled.div`
  position: fixed;
  bottom: ${props => props.show ? '0' : '-100px'};
  left: 0;
  right: 0;
  background-color: #2d3436;
  color: #fff;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: bottom 0.3s ease;
  z-index: 1000;
  box-shadow: 0 -5px 10px rgba(0, 0, 0, 0.1);
  
  p {
    margin: 0;
    padding-right: 1rem;
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    
    p {
      margin-bottom: 1rem;
      text-align: center;
    }
  }
`;

const CookieConsent = () => {
  const [show, setShow] = useState(false);
  
  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      const timer = setTimeout(() => {
        setShow(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const acceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShow(false);
  };
  
  return (
    <CookieBanner show={show}>
      <p>
        We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.
      </p>
      <Button variant="primary" onClick={acceptCookies}>
        I understand
      </Button>
    </CookieBanner>
  );
};

export default CookieConsent; 