import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import SearchBox from '../SearchBox';
import { logout } from '../../actions/userActions';
import styled from 'styled-components';

const StyledNavbar = styled(Navbar)`
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 0.75rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 80px;
  
  .navbar-brand {
    font-weight: 700;
    font-size: 1.5rem;
    color: #6c5ce7;
    
    span {
      color: #333;
    }
  }
  
  .nav-link {
    color: #333 !important;
    font-weight: 500;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
    
    &:hover {
      color: #6c5ce7 !important;
    }
    
    &.active {
      color: #6c5ce7 !important;
    }
  }
  
  .dropdown-menu {
    border: none;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 0.5rem;
    
    .dropdown-item {
      padding: 0.5rem 1rem;
      border-radius: 5px;
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
        color: #6c5ce7;
      }
      
      &.active {
        background-color: #6c5ce7;
        color: #fff;
      }
    }
  }
  
  .navbar-collapse {
    justify-content: space-between;
  }
  
  .navbar-toggler {
    border-color: #6c5ce7;
    
    &:focus {
      box-shadow: 0 0 0 0.25rem rgba(108, 92, 231, 0.25);
    }
  }
  
  @media (max-width: 991px) {
    height: auto;
    
    .navbar-collapse {
      padding: 1rem 0;
      background-color: #fff;
      border-radius: 0 0 10px 10px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 80px;
      left: 0;
      right: 0;
      z-index: 1000;
    }
    
    .search-container {
      margin: 1rem 0;
      width: 100%;
    }
  }
`;

const ProfileAvatar = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: #6c5ce7;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  
  .user-name {
    font-weight: 600;
    margin-right: 0.5rem;
  }
  
  .user-role {
    font-size: 0.8rem;
    background-color: #6c5ce7;
    color: white;
    padding: 0.2rem 0.5rem;
    border-radius: 50px;
    margin-left: 0.5rem;
  }
`;

const CartBadge = styled(Badge)`
  position: absolute;
  top: -10px;
  right: -10px;
  background-color: #6c5ce7;
  border-radius: 50%;
  padding: 0.25rem 0.5rem;
  font-size: 0.7rem;
`;

const CartIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0.5rem;
  
  i {
    font-size: 1.2rem;
  }
`;

const NavIcons = styled(Nav)`
  display: flex;
  align-items: center;
  
  .nav-link {
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-left: 0.5rem;
  }
`;

const SearchContainer = styled.div`
  @media (min-width: 992px) {
    width: 300px;
  }
`;

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };
  
  // Get the first letter of the user's name for the avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };
  
  // Calculate total items in cart
  const cartItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header>
      <StyledNavbar expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>CAFÉ<span>DELIGHT</span></Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/menu">
                <Nav.Link>MENU</Nav.Link>
              </LinkContainer>
              
              <NavDropdown title="SERVICES" id="services-dropdown">
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
              
              <LinkContainer to="/blog">
                <Nav.Link>BLOG</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/about-us">
                <Nav.Link>ABOUT US</Nav.Link>
              </LinkContainer>
              
              <LinkContainer to="/contact">
                <Nav.Link>CONTACT</Nav.Link>
              </LinkContainer>
            </Nav>
            
            <SearchContainer className="search-container">
              <SearchBox />
            </SearchContainer>
            
            <NavIcons>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <CartIcon>
                    <i className="fas fa-shopping-cart"></i>
                    {cartItemsCount > 0 && (
                      <CartBadge pill>{cartItemsCount}</CartBadge>
                    )}
                  </CartIcon>
                </Nav.Link>
              </LinkContainer>
              
              {userInfo ? (
                <NavDropdown 
                  title={
                    <UserInfo>
                      <ProfileAvatar>
                        {getInitial(userInfo.name)}
                      </ProfileAvatar>
                    </UserInfo>
                  } 
                  id="username"
                  align="end"
                >
                  <NavDropdown.Item disabled className="user-info">
                    <strong>{userInfo.name}</strong>
                    {userInfo.isAdmin && <span className="user-role">Admin</span>}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  
                  {userInfo.isAdmin && (
                    <LinkContainer to="/admin">
                      <NavDropdown.Item>
                        <i className="fas fa-tachometer-alt"></i> Admin Dashboard
                      </NavDropdown.Item>
                    </LinkContainer>
                  )}
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
            </NavIcons>
          </Navbar.Collapse>
        </Container>
      </StyledNavbar>
    </header>
  );
};

export default Header; 