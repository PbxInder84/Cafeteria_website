import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import SearchBox from './SearchBox';
import { logout } from '../actions/userActions';
import logo from '../assets/images/logo.png';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    // Dispatch logout to clear user data but DO NOT clear the cart data
    dispatch(logout());
    
    // Optionally, redirect the user after logout if needed
    // eslint-disable-next-line no-restricted-globals
    history.push('/login'); // if you're using react-router's history object
  };

  return (
    <header>
      <Navbar className="nav-bar" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                alt="Cafedelight"
                src={logo}
                width="64"
                height="64"
                className="d-inline-block align-middle"
              />
              <span className="ms-2 fw-bold">CaféDelight</span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle
            className="nav-toggle"
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
            <Route render={({ history }) => <SearchBox history={history} />} />
            <Nav>
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fas fa-shopping-cart"></i> Cart
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

              {!userInfo && (
                <LinkContainer to="/signup">
                  <Nav.Link className="ms-3">Sign Up</Nav.Link>
                </LinkContainer>
              )}

              <ServicesDropdown />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
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
    <section className="services-section">
      <Container>
        <h2 className="text-center my-4">Our Services</h2>
        <div className="row">
          <div className="col-md-4">
            <div className="service-card">
              <i className="fas fa-coffee fa-3x mb-3"></i>
              <h4>Custom Coffee Blends</h4>
              <p>Experience unique flavors crafted to your preferences.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <i className="fas fa-cookie-bite fa-3x mb-3"></i>
              <h4>Freshly Baked Goods</h4>
              <p>Delicious pastries and baked goods prepared daily.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="service-card">
              <i className="fas fa-wifi fa-3x mb-3"></i>
              <h4>Free Wi-Fi & Co-working</h4>
              <p>A comfortable environment for work and leisure.</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Header;
export { Services, ServicesDropdown };
