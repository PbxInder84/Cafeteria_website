import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  border-radius: 8px;
  margin: 1.5rem 0;
  
  &.alert-info {
    background-color: #e3f2fd;
    border-color: #bbdefb;
    color: #0d47a1;
  }
  
  &.alert-danger {
    background-color: #ffebee;
    border-color: #ffcdd2;
    color: #b71c1c;
  }
  
  &.alert-success {
    background-color: #e8f5e9;
    border-color: #c8e6c9;
    color: #1b5e20;
  }
  
  &.alert-warning {
    background-color: #fff8e1;
    border-color: #ffecb3;
    color: #ff6f00;
  }
`;

const Message = ({ variant, children }) => {
  return <StyledAlert variant={variant}>{children}</StyledAlert>;
};

Message.defaultProps = {
  variant: 'info',
};

export default Message; 