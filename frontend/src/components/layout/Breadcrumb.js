import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as BootstrapBreadcrumb } from 'react-bootstrap';
import styled from 'styled-components';

const StyledBreadcrumb = styled(BootstrapBreadcrumb)`
  background-color: transparent;
  padding: 1rem 0;
  margin-bottom: 2rem;
  
  .breadcrumb-item {
    font-size: 0.9rem;
    
    a {
      color: #6c5ce7;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    &.active {
      color: #666;
    }
  }
`;

const Breadcrumb = ({ items }) => {
  return (
    <StyledBreadcrumb>
      <BootstrapBreadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Home
      </BootstrapBreadcrumb.Item>
      
      {items.map((item, index) => (
        <BootstrapBreadcrumb.Item
          key={index}
          active={index === items.length - 1}
          linkAs={index !== items.length - 1 ? Link : undefined}
          linkProps={index !== items.length - 1 ? { to: item.link } : undefined}
        >
          {item.name}
        </BootstrapBreadcrumb.Item>
      ))}
    </StyledBreadcrumb>
  );
};

export default Breadcrumb; 