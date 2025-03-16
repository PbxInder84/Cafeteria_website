import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import DashboardBreadcrumb from './DashboardBreadcrumb';
import Meta from '../layout/Meta';

const DashboardContainer = styled(Container)`
  padding-top: 2rem;
  padding-bottom: 2rem;
`;

const Sidebar = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  height: 100%;
  
  @media (max-width: 991px) {
    margin-bottom: 2rem;
  }
`;

const SidebarNav = styled(Nav)`
  flex-direction: column;
  
  .nav-link {
    color: #4a5568;
    padding: 0.75rem 1rem;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    
    i {
      margin-right: 0.75rem;
      font-size: 1.1rem;
      width: 20px;
      text-align: center;
    }
    
    &:hover {
      background-color: #f7fafc;
      color: #6c5ce7;
    }
    
    &.active {
      background-color: #6c5ce7;
      color: #fff;
      
      &:hover {
        background-color: #5649c0;
      }
    }
  }
  
  .nav-section {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #a0aec0;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    padding-left: 1rem;
  }
`;

const ContentArea = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  min-height: 80vh;
`;

const PageTitle = styled.h1`
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #2d3748;
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
`;

const MobileMenuToggle = styled.button`
  display: none;
  background-color: #6c5ce7;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  
  @media (max-width: 991px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    
    i {
      margin-right: 0.5rem;
    }
  }
`;

const DashboardLayout = ({ 
  title, 
  description, 
  breadcrumbItems = [], 
  children 
}) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  
  return (
    <>
      <Meta title={`Admin - ${title}`} description={description} />
      <DashboardContainer fluid>
        <Row>
          <Col lg={3}>
            <MobileMenuToggle onClick={toggleSidebar}>
              <i className="fas fa-bars"></i> Menu
            </MobileMenuToggle>
            
            <Sidebar className={showSidebar ? 'd-block' : 'd-none d-lg-block'}>
              <SidebarNav>
                <Nav.Link 
                  as={Link} 
                  to="/admin" 
                  className={location.pathname === '/admin' ? 'active' : ''}
                >
                  <i className="fas fa-tachometer-alt"></i> Dashboard
                </Nav.Link>
                
                <div className="nav-section">Products</div>
                <Nav.Link 
                  as={Link} 
                  to="/admin/productlist" 
                  className={location.pathname.includes('/admin/productlist') ? 'active' : ''}
                >
                  <i className="fas fa-coffee"></i> Products
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/inventory" 
                  className={location.pathname.includes('/admin/inventory') ? 'active' : ''}
                >
                  <i className="fas fa-boxes"></i> Inventory
                </Nav.Link>
                
                <div className="nav-section">Orders</div>
                <Nav.Link 
                  as={Link} 
                  to="/admin/orderlist" 
                  className={location.pathname === '/admin/orderlist' ? 'active' : ''}
                >
                  <i className="fas fa-shopping-cart"></i> All Orders
                </Nav.Link>
                <Nav.Link 
                  as={Link} 
                  to="/admin/orders/pending" 
                  className={location.pathname.includes('/admin/orders/pending') ? 'active' : ''}
                >
                  <i className="fas fa-clock"></i> Pending Orders
                </Nav.Link>
                
                <div className="nav-section">Users</div>
                <Nav.Link 
                  as={Link} 
                  to="/admin/userlist" 
                  className={location.pathname.includes('/admin/userlist') ? 'active' : ''}
                >
                  <i className="fas fa-users"></i> Users
                </Nav.Link>
                
                <div className="nav-section">Analytics</div>
                <Nav.Link 
                  as={Link} 
                  to="/admin/reports" 
                  className={location.pathname.includes('/admin/reports') ? 'active' : ''}
                >
                  <i className="fas fa-chart-bar"></i> Reports
                </Nav.Link>
              </SidebarNav>
            </Sidebar>
          </Col>
          
          <Col lg={9}>
            <ContentArea>
              <DashboardBreadcrumb items={breadcrumbItems} />
              <PageTitle>{title}</PageTitle>
              {children}
            </ContentArea>
          </Col>
        </Row>
      </DashboardContainer>
    </>
  );
};

export default DashboardLayout; 