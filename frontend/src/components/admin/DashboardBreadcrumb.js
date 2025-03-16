import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import styled from 'styled-components';

const StyledBreadcrumb = styled(Breadcrumb)`
  background-color: transparent;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;
  
  .breadcrumb-item {
    font-size: 0.9rem;
    
    a {
      color: #6c5ce7;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        color: #5649c0;
        text-decoration: underline;
      }
    }
    
    &.active {
      color: #4a5568;
      font-weight: 600;
    }
    
    + .breadcrumb-item::before {
      content: "›";
      color: #a0aec0;
    }
  }
`;

const DashboardBreadcrumb = ({ items }) => {
  return (
    <StyledBreadcrumb>
      <LinkContainer to="/admin">
        <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
      </LinkContainer>
      
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index === items.length - 1 ? (
            <Breadcrumb.Item active>{item.name}</Breadcrumb.Item>
          ) : (
            <LinkContainer to={item.link}>
              <Breadcrumb.Item>{item.name}</Breadcrumb.Item>
            </LinkContainer>
          )}
        </React.Fragment>
      ))}
    </StyledBreadcrumb>
  );
};

export default DashboardBreadcrumb; 