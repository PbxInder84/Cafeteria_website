import React from 'react';
import { Spinner } from 'react-bootstrap';
import styled from 'styled-components';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${props => props.size === 'sm' ? '0.5rem' : '2rem'};
`;

const StyledSpinner = styled(Spinner)`
  width: ${props => props.size === 'sm' ? '1.5rem' : '3rem'};
  height: ${props => props.size === 'sm' ? '1.5rem' : '3rem'};
  border-width: ${props => props.size === 'sm' ? '0.2em' : '0.25em'};
`;

const Loader = ({ size }) => {
  return (
    <LoaderContainer size={size}>
      <StyledSpinner
        animation="border"
        role="status"
        variant="primary"
        size={size}
      >
        <span className="sr-only">Loading...</span>
      </StyledSpinner>
    </LoaderContainer>
  );
};

export default Loader; 