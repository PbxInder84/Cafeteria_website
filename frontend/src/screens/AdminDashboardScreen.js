import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers } from '../actions/userActions';
import { listOrders } from '../actions/orderActions';
import { listProducts } from '../actions/productActions';
import DashboardLayout from '../components/admin/DashboardLayout';
import DashboardCard from '../components/admin/DashboardCard';
import StatsCard from '../components/admin/StatsCard';
import Message from '../components/Message';
import Loader from '../components/layout/Loader';

const AdminDashboardScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;
  
  const orderList = useSelector((state) => state.orderList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderList;
  
  const productList = useSelector((state) => state.productList);
  const { loading: loadingProducts, error: errorProducts, products } = productList;
  
  // Calculate total revenue
  const totalRevenue = orders ? orders.reduce((acc, order) => {
    return order.isPaid ? acc + order.totalPrice : acc;
  }, 0) : 0;
  
  // Calculate pending orders
  const pendingOrders = orders ? orders.filter(
    (order) => order.isPaid && !order.isDelivered
  ).length : 0;
  
  // Calculate low stock items
  const lowStockItems = products ? products.filter(
    (product) => product.countInStock < 10
  ).length : 0;
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listUsers());
      dispatch(listOrders());
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo]);
  
  return (
    <DashboardLayout 
      title="Dashboard" 
      description="Admin Dashboard for CaféDelight"
    >
      <Row className="mb-4">
        <Col md={3}>
          <StatsCard
            title="Total Users"
            value={users ? users.length : 0}
            icon="fas fa-users"
            iconBg="#6c5ce7"
            loading={loadingUsers}
            error={errorUsers}
          />
        </Col>
        <Col md={3}>
          <StatsCard
            title="Total Orders"
            value={orders ? orders.length : 0}
            icon="fas fa-shopping-cart"
            iconBg="#00b894"
            loading={loadingOrders}
            error={errorOrders}
          />
        </Col>
        <Col md={3}>
          <StatsCard
            title="Total Products"
            value={products ? products.length : 0}
            icon="fas fa-coffee"
            iconBg="#fdcb6e"
            loading={loadingProducts}
            error={errorProducts}
          />
        </Col>
        <Col md={3}>
          <StatsCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon="fas fa-dollar-sign"
            iconBg="#e84393"
            loading={loadingOrders}
            error={errorOrders}
          />
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col md={6}>
          <StatsCard
            title="Pending Orders"
            value={pendingOrders}
            icon="fas fa-clock"
            iconBg="#ff7675"
            loading={loadingOrders}
            error={errorOrders}
            change={pendingOrders > 0 ? `${pendingOrders} orders need attention` : 'No pending orders'}
            changeType={pendingOrders > 0 ? 'negative' : 'positive'}
          />
        </Col>
        <Col md={6}>
          <StatsCard
            title="Low Stock Items"
            value={lowStockItems}
            icon="fas fa-exclamation-triangle"
            iconBg="#ffa502"
            loading={loadingProducts}
            error={errorProducts}
            change={lowStockItems > 0 ? `${lowStockItems} items need restocking` : 'Inventory levels good'}
            changeType={lowStockItems > 0 ? 'negative' : 'positive'}
          />
        </Col>
      </Row>
      
      <Row>
        <Col md={4} className="mb-4">
          <DashboardCard
            title="User Management"
            icon="fas fa-users"
            description="Manage user accounts, update user information, and control admin privileges."
            linkText="Manage Users"
            linkUrl="/admin/userlist"
          />
        </Col>
        
        <Col md={4} className="mb-4">
          <DashboardCard
            title="Product Management"
            icon="fas fa-coffee"
            description="Add, edit, or remove products from your inventory. Update prices, descriptions, and images."
            linkText="Manage Products"
            linkUrl="/admin/productlist"
            headerBg="#00b894"
            linkBg="#00b894"
            linkHoverBg="#00a885"
          />
        </Col>
        
        <Col md={4} className="mb-4">
          <DashboardCard
            title="Order Management"
            icon="fas fa-shopping-cart"
            description="View and manage customer orders. Update order status and track deliveries."
            linkText="Manage Orders"
            linkUrl="/admin/orderlist"
            headerBg="#fdcb6e"
            linkBg="#fdcb6e"
            linkHoverBg="#f0b94e"
          />
        </Col>
      </Row>
      
      <Row>
        <Col md={6} className="mb-4">
          <DashboardCard
            title="Inventory Management"
            icon="fas fa-boxes"
            description="Track stock levels, update inventory, and manage product availability."
            linkText="Manage Inventory"
            linkUrl="/admin/inventory"
            headerBg="#ff7675"
            linkBg="#ff7675"
            linkHoverBg="#e06665"
          />
        </Col>
        
        <Col md={6} className="mb-4">
          <DashboardCard
            title="Sales Reports"
            icon="fas fa-chart-bar"
            description="View sales analytics, generate reports, and track business performance."
            linkText="View Reports"
            linkUrl="/admin/reports"
            headerBg="#74b9ff"
            linkBg="#74b9ff"
            linkHoverBg="#5a9ee0"
          />
        </Col>
      </Row>
      
      {loadingOrders ? (
        <Loader />
      ) : errorOrders ? (
        <Message variant="danger">{errorOrders}</Message>
      ) : orders && orders.length > 0 ? (
        <div className="mt-4">
          <h3>Recent Orders</h3>
          <ul className="list-group">
            {orders.slice(0, 5).map((order) => (
              <li key={order._id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <strong>Order #{order._id.substring(0, 8)}</strong> - {order.user && order.user.name}
                  <div className="text-muted small">
                    {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
                  </div>
                </div>
                <div>
                  <span className="badge bg-primary rounded-pill me-2">${order.totalPrice.toFixed(2)}</span>
                  {order.isPaid ? (
                    <span className="badge bg-success rounded-pill">Paid</span>
                  ) : (
                    <span className="badge bg-danger rounded-pill">Not Paid</span>
                  )}
                  {' '}
                  {order.isDelivered ? (
                    <span className="badge bg-success rounded-pill">Delivered</span>
                  ) : (
                    <span className="badge bg-warning rounded-pill">Pending</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Message>No orders found</Message>
      )}
    </DashboardLayout>
  );
};

export default AdminDashboardScreen; 