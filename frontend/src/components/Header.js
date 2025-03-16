import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import logo from '../assets/images/logo.png';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  .navbar-brand img {
    height: 40px;
  }
  
  .nav-link {
    font-weight: 500;
    color: #333 !important;
    margin: 0 0.5rem;
    position: relative;
    transition: all 0.3s ease;
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      width: 0;
      height: 2px;
      background-color: #6c5ce7;
      transition: all 0.3s ease;
      transform: translateX(-50%);
    }
    
    &:hover, &.active {
      color: #6c5ce7 !important;
      
      &:after {
        width: 100%;
      }
    }
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    
    .dropdown-item {
      padding: 0.5rem 1.5rem;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
        color: #6c5ce7;
      }
    }
  }
  
  .cart-icon {
    position: relative;
    
    .badge {
      position: absolute;
      top: -8px;
      right: -8px;
      background-color: #6c5ce7;
      color: white;
      border-radius: 50%;
      padding: 0.25rem 0.5rem;
      font-size: 0.7rem;
    }
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <header>
      <StyledNavbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                alt="Cafedelight"
                src={logo}
                className="d-inline-block align-middle"
              />
              <span className="ms-2 fw-bold">CaféDelight</span>
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle 
            aria-controls="basic-navbar-nav" 
            onClick={handleNavCollapse} 
            className="nav-toggle"
          />
          
          <Navbar.Collapse id="basic-navbar-nav" className={isNavCollapsed ? 'collapse' : ''}>
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav className="ms-auto">
              <LinkContainer to="/" exact>
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/products">
                <Nav.Link>Menu</Nav.Link>
              </LinkContainer>
              
              <ServicesDropdown />
              
              <LinkContainer to="/blog">
                <Nav.Link>Blog</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/cart">
                <Nav.Link className="cart-icon">
                  <i className="fas fa-shopping-cart"></i>
                  {cartItems && cartItems.length > 0 && (
                    <span className="badge">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                  )}
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              
              {!userInfo && (
                <LinkContainer to="/signup">
                  <Nav.Link className="ms-3">Sign Up</Nav.Link>
                </LinkContainer>
              )}
              
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              
              {userInfo && userInfo.isAdminSeller && (
                <NavDropdown title="Seller" id="sellermenu">
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </header>
  );
};

const ServicesDropdown = () => {
  return (
    <NavDropdown title="Services" id="services-dropdown">
      <LinkContainer to="/services/custom-coffee">
        <NavDropdown.Item>Custom Coffee Blends</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to="/services/fresh-bakes">
        <NavDropdown.Item>Freshly Baked Goods</NavDropdown.Item>
      </LinkContainer>
      <LinkContainer to="/services/wifi-coworking">
        <NavDropdown.Item>Wi-Fi & Co-working</NavDropdown.Item>
      </LinkContainer>
    </NavDropdown>
  );
};

const Services = () => {
  return (
    <section className="services-section py-5 bg-light">
      <Container>
        <h2 className="text-center mb-5 position-relative" style={{ 
          fontWeight: 700,
          color: '#333',
          paddingBottom: '20px'
        }}>
          Our Services
          <span style={{
            content: '',
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70px',
            height: '3px',
            backgroundColor: '#6c5ce7',
            display: 'block'
          }}></span>
        </h2>
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="service-card bg-white p-4 rounded shadow-sm h-100 text-center transition-all" style={{
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <i className="fas fa-coffee fa-3x mb-3" style={{ color: '#6c5ce7' }}></i>
              <h4 className="mb-3 fw-bold">Custom Coffee Blends</h4>
              <p className="text-muted">Experience unique flavors crafted to your preferences. Our baristas will help you discover your perfect blend.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="service-card bg-white p-4 rounded shadow-sm h-100 text-center" style={{
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <i className="fas fa-cookie-bite fa-3x mb-3" style={{ color: '#6c5ce7' }}></i>
              <h4 className="mb-3 fw-bold">Freshly Baked Goods</h4>
              <p className="text-muted">Delicious pastries and baked goods prepared daily using traditional recipes and premium ingredients.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="service-card bg-white p-4 rounded shadow-sm h-100 text-center" style={{
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}>
              <i className="fas fa-wifi fa-3x mb-3" style={{ color: '#6c5ce7' }}></i>
              <h4 className="mb-3 fw-bold">Free Wi-Fi & Co-working</h4>
              <p className="text-muted">A comfortable environment for work and leisure with high-speed internet and ergonomic seating arrangements.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
export { Services, ServicesDropdown };
