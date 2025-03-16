import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Card, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listOrders } from '../actions/orderActions';
import PageLayout from '../components/layout/PageLayout';
import Loader from '../components/layout/Loader';
import Message from '../components/Message';
import styled from 'styled-components';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReportCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  .card-header {
    background-color: #6c5ce7;
    color: #fff;
    font-weight: 700;
    padding: 1.5rem;
    border-radius: 10px 10px 0 0;
  }
  
  .card-body {
    padding: 1.5rem;
  }
`;

const ReportTable = styled(Table)`
  margin-top: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  overflow: hidden;
  
  thead {
    background-color: #f8f9fa;
    
    th {
      font-weight: 600;
      color: #333;
      padding: 1rem;
      border-bottom: none;
    }
  }
  
  tbody {
    tr {
      transition: all 0.3s ease;
      
      &:hover {
        background-color: #f8f9fa;
      }
      
      td {
        padding: 1rem;
        vertical-align: middle;
      }
    }
  }
  
  .total-row {
    font-weight: 700;
    background-color: #f8f9fa;
    
    td {
      border-top: 2px solid #ddd;
    }
  }
`;

const FilterForm = styled(Form)`
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 10px;
  
  .form-label {
    font-weight: 600;
  }
  
  .form-control {
    border-radius: 5px;
    border: 1px solid #ddd;
    
    &:focus {
      box-shadow: none;
      border-color: #6c5ce7;
    }
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`;

const ReportsScreen = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [reportType, setReportType] = useState('sales');
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listOrders());
    }
  }, [dispatch, navigate, userInfo]);
  
  const filterOrders = useCallback(() => {
    let filteredOrders = [...orders];
    
    if (startDate && endDate) {
      filteredOrders = filteredOrders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }
    
    setFilteredOrders(filteredOrders);
    calculateStats(filteredOrders);
  }, [orders, startDate, endDate]);
  
  useEffect(() => {
    if (orders) {
      filterOrders();
    }
  }, [orders, startDate, endDate, filterOrders]);
  
  const getTotalSales = () => {
    return filteredOrders.reduce((acc, order) => acc + order.totalPrice, 0);
  };
  
  const getAverageOrderValue = () => {
    if (filteredOrders.length === 0) return 0;
    return getTotalSales() / filteredOrders.length;
  };
  
  const getProductSales = () => {
    const productSales = {};
    
    filteredOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        if (productSales[item.name]) {
          productSales[item.name].quantity += item.qty;
          productSales[item.name].revenue += item.price * item.qty;
        } else {
          productSales[item.name] = {
            quantity: item.qty,
            revenue: item.price * item.qty,
          };
        }
      });
    });
    
    return Object.entries(productSales).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      revenue: data.revenue,
    }));
  };
  
  const getSalesChartData = () => {
    // Group sales by date
    const salesByDate = {};
    
    filteredOrders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      
      if (salesByDate[date]) {
        salesByDate[date] += order.totalPrice;
      } else {
        salesByDate[date] = order.totalPrice;
      }
    });
    
    // Sort dates
    const sortedDates = Object.keys(salesByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );
    
    return {
      labels: sortedDates,
      datasets: [
        {
          label: 'Sales ($)',
          data: sortedDates.map((date) => salesByDate[date]),
          backgroundColor: 'rgba(108, 92, 231, 0.6)',
          borderColor: '#6c5ce7',
          borderWidth: 1,
        },
      ],
    };
  };
  
  return (
    <PageLayout 
      title="Sales Reports" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Reports', link: '' }
      ]}
    >
      <FilterForm>
        <Row>
          <Col md={3}>
            <Form.Group controlId="reportType" className="mb-3">
              <Form.Label>Report Type</Form.Label>
              <Form.Select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales Report</option>
                <option value="orders">Order Report</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="endDate" className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3} className="d-flex align-items-end">
            <Button 
              variant="primary" 
              className="mb-3 w-100"
              onClick={filterOrders}
            >
              Apply Filters
            </Button>
          </Col>
        </Row>
      </FilterForm>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={4}>
              <ReportCard>
                <Card.Header>Total Sales</Card.Header>
                <Card.Body>
                  <h2>${getTotalSales().toFixed(2)}</h2>
                </Card.Body>
              </ReportCard>
            </Col>
            <Col md={4}>
              <ReportCard>
                <Card.Header>Total Orders</Card.Header>
                <Card.Body>
                  <h2>{filteredOrders.length}</h2>
                </Card.Body>
              </ReportCard>
            </Col>
            <Col md={4}>
              <ReportCard>
                <Card.Header>Average Order Value</Card.Header>
                <Card.Body>
                  <h2>${getAverageOrderValue().toFixed(2)}</h2>
                </Card.Body>
              </ReportCard>
            </Col>
          </Row>
          
          <ReportCard>
            <Card.Header>Sales Trend</Card.Header>
            <Card.Body>
              <Bar 
                data={getSalesChartData()} 
                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      position: 'top',
                    },
                    title: {
                      display: true,
                      text: 'Daily Sales',
                    },
                  },
                }}
              />
            </Card.Body>
          </ReportCard>
          
          <ReportCard>
            <Card.Header>
              {reportType === 'sales' ? 'Product Sales' : 'Order Details'}
            </Card.Header>
            <Card.Body>
              {reportType === 'sales' ? (
                <ReportTable striped hover responsive>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity Sold</th>
                      <th>Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getProductSales().map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.revenue.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="total-row">
                      <td>Total</td>
                      <td>
                        {getProductSales().reduce(
                          (acc, product) => acc + product.quantity,
                          0
                        )}
                      </td>
                      <td>${getTotalSales().toFixed(2)}</td>
                    </tr>
                  </tbody>
                </ReportTable>
              ) : (
                <ReportTable striped hover responsive>
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user && order.user.name}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>
                          {order.isPaid ? (
                            <span className="badge bg-success">Paid</span>
                          ) : (
                            <span className="badge bg-danger">Not Paid</span>
                          )}
                          {' '}
                          {order.isDelivered ? (
                            <span className="badge bg-success">Delivered</span>
                          ) : (
                            <span className="badge bg-warning">Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </ReportTable>
              )}
            </Card.Body>
          </ReportCard>
        </>
      )}
    </PageLayout>
  );
};

export default ReportsScreen; 