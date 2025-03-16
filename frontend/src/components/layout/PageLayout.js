import React from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import Meta from './Meta';
import Breadcrumb from './Breadcrumb';

const PageWrapper = styled.div`
  padding: 2rem 0;
  min-height: calc(100vh - 300px);
`;

const PageHeader = styled.div`
  margin-bottom: 2rem;
  
  h1 {
    font-weight: 700;
    margin-bottom: 1rem;
    color: #333;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 70px;
      height: 3px;
      background-color: #6c5ce7;
    }
  }
`;

const PageLayout = ({ 
  title, 
  description, 
  keywords, 
  breadcrumbItems = [], 
  children,
  fullWidth = false
}) => {
  return (
    <>
      <Meta title={title} description={description} keywords={keywords} />
      <PageWrapper>
        {fullWidth ? (
          <>
            {breadcrumbItems.length > 0 && (
              <Container>
                <Breadcrumb items={breadcrumbItems} />
              </Container>
            )}
            {title && (
              <Container>
                <PageHeader>
                  <h1>{title}</h1>
                </PageHeader>
              </Container>
            )}
            {children}
          </>
        ) : (
          <Container>
            {breadcrumbItems.length > 0 && <Breadcrumb items={breadcrumbItems} />}
            {title && (
              <PageHeader>
                <h1>{title}</h1>
              </PageHeader>
            )}
            {children}
          </Container>
        )}
      </PageWrapper>
    </>
  );
};

export default PageLayout; 