import React from 'react';
import { Card } from 'react-bootstrap';
import styled from 'styled-components';
import Loader from '../layout/Loader';

// Use a function to get the background color from props
const getIconBgColor = props => props.iconBg || '#6c5ce7';

const StyledCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  .card-body {
    padding: 1.5rem;
    display: flex;
    align-items: center;
  }
  
  .icon-container {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: ${getIconBgColor};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    
    i {
      font-size: 1.5rem;
      color: #fff;
    }
  }
  
  .stats-content {
    flex: 1;
  }
  
  .stats-title {
    color: #666;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }
  
  .stats-value {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    margin-bottom: 0;
  }
  
  .stats-change {
    font-size: 0.85rem;
    margin-top: 0.25rem;
    
    &.positive {
      color: #00b894;
    }
    
    &.negative {
      color: #d63031;
    }
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
`;

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  iconBg, 
  loading, 
  error,
  change,
  changeType = 'neutral' // 'positive', 'negative', or 'neutral'
}) => {
  return (
    <StyledCard>
      <Card.Body>
        <div className="icon-container">
          <i className={icon}></i>
        </div>
        <div className="stats-content">
          <p className="stats-title">{title}</p>
          {loading ? (
            <LoaderContainer>
              <Loader size="sm" />
            </LoaderContainer>
          ) : error ? (
            <p className="text-danger">Error loading data</p>
          ) : (
            <>
              <h3 className="stats-value">{value}</h3>
              {change && (
                <p className={`stats-change ${changeType}`}>
                  {changeType === 'positive' && <i className="fas fa-arrow-up"></i>}
                  {changeType === 'negative' && <i className="fas fa-arrow-down"></i>}
                  {' '}{change}
                </p>
              )}
            </>
          )}
        </div>
      </Card.Body>
    </StyledCard>
  );
};

export default StatsCard; 