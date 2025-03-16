import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Use functions to get colors from props
const getHeaderBgColor = props => props.headerBg || '#6c5ce7';
const getLinkBgColor = props => props.linkBg || '#6c5ce7';
const getLinkHoverBgColor = props => props.linkHoverBg || '#5649c0';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled(Card.Header)`
  background-color: ${getHeaderBgColor};
  color: #fff;
  font-weight: 700;
  padding: 1.5rem;
  border-radius: 10px 10px 0 0;
  display: flex;
  align-items: center;
  
  i {
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }
`;

const CardLink = styled(Link)`
  display: inline-block;
  background-color: ${getLinkBgColor};
  color: #fff;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${getLinkHoverBgColor};
    color: #fff;
  }
  
  i {
    margin-left: 0.5rem;
  }
`;

const DashboardCard = ({ 
  title, 
  icon, 
  description, 
  linkText, 
  linkUrl, 
  headerBg, 
  linkBg, 
  linkHoverBg 
}) => {
  return (
    <StyledCard>
      <CardHeader headerBg={headerBg}>
        <i className={icon}></i>
        {title}
      </CardHeader>
      <Card.Body>
        <Card.Text>
          {description}
        </Card.Text>
        <CardLink to={linkUrl} linkBg={linkBg} linkHoverBg={linkHoverBg}>
          {linkText} <i className="fas fa-arrow-right"></i>
        </CardLink>
      </Card.Body>
    </StyledCard>
  );
};

export default DashboardCard; 