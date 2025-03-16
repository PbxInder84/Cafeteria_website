import React, { useEffect, useState } from 'react';
import { Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listProducts, updateProduct } from '../actions/productActions';
import PageLayout from '../components/layout/PageLayout';
import Loader from '../components/layout/Loader';
import Message from '../components/Message';
import styled from 'styled-components';

const InventoryTable = styled(Table)`
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
  
  .product-name {
    font-weight: 600;
    color: #333;
  }
  
  .stock-low {
    color: #e74c3c;
    font-weight: 700;
  }
  
  .stock-medium {
    color: #f39c12;
    font-weight: 700;
  }
  
  .stock-high {
    color: #27ae60;
    font-weight: 700;
  }
  
  .btn-update {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
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

const StatsCard = styled(Card)`
  border: none;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  
  .card-body {
    padding: 1.5rem;
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
`;

const StockInput = styled(Form.Control)`
  width: 80px;
  text-align: center;
  display: inline-block;
  margin-right: 0.5rem;
`;

const InventoryScreen = () => {
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stockFilter, setStockFilter] = useState('all');
  const [editMode, setEditMode] = useState({});
  const [stockUpdates, setStockUpdates] = useState({});
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  
  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  
  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, navigate, userInfo, successUpdate]);
  
  const getFilteredProducts = () => {
    let filtered = products || [];
    
    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.brand.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (stockFilter === 'low') {
      filtered = filtered.filter((product) => product.countInStock < 10);
    } else if (stockFilter === 'out') {
      filtered = filtered.filter((product) => product.countInStock === 0);
    }
    
    return filtered;
  };
  
  const getCategories = () => {
    if (!products) return [];
    
    const categories = [...new Set(products.map((product) => product.category))];
    return categories;
  };
  
  const getStockStatus = (countInStock) => {
    if (countInStock === 0) {
      return <span className="stock-low">Out of Stock</span>;
    } else if (countInStock < 10) {
      return <span className="stock-medium">Low Stock</span>;
    } else {
      return <span className="stock-high">In Stock</span>;
    }
  };
  
  const getLowStockCount = () => {
    if (!products) return 0;
    return products.filter((product) => product.countInStock < 10).length;
  };
  
  const getOutOfStockCount = () => {
    if (!products) return 0;
    return products.filter((product) => product.countInStock === 0).length;
  };
  
  const getTotalInventoryValue = () => {
    if (!products) return 0;
    return products.reduce(
      (acc, product) => acc + product.price * product.countInStock,
      0
    );
  };
  
  const handleEditStock = (productId) => {
    setEditMode({ ...editMode, [productId]: true });
    
    const product = products.find((p) => p._id === productId);
    setStockUpdates({
      ...stockUpdates,
      [productId]: product.countInStock,
    });
  };
  
  const handleStockChange = (productId, value) => {
    setStockUpdates({
      ...stockUpdates,
      [productId]: parseInt(value) || 0,
    });
  };
  
  const handleUpdateStock = (productId) => {
    const product = products.find((p) => p._id === productId);
    
    dispatch(
      updateProduct({
        _id: productId,
        name: product.name,
        price: product.price,
        image: product.image,
        brand: product.brand,
        category: product.category,
        description: product.description,
        countInStock: stockUpdates[productId],
      })
    );
    
    setEditMode({ ...editMode, [productId]: false });
  };
  
  const handleCancelEdit = (productId) => {
    setEditMode({ ...editMode, [productId]: false });
  };
  
  return (
    <PageLayout 
      title="Inventory Management" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Inventory', link: '' }
      ]}
    >
      <Row className="mb-4">
        <Col md={4}>
          <StatsCard>
            <Card.Body>
              <p className="stats-title">Total Products</p>
              <h3 className="stats-value">{products ? products.length : 0}</h3>
            </Card.Body>
          </StatsCard>
        </Col>
        <Col md={4}>
          <StatsCard>
            <Card.Body>
              <p className="stats-title">Low Stock Items</p>
              <h3 className="stats-value">{getLowStockCount()}</h3>
            </Card.Body>
          </StatsCard>
        </Col>
        <Col md={4}>
          <StatsCard>
            <Card.Body>
              <p className="stats-title">Inventory Value</p>
              <h3 className="stats-value">${getTotalInventoryValue().toFixed(2)}</h3>
            </Card.Body>
          </StatsCard>
        </Col>
      </Row>
      
      <FilterForm>
        <Row>
          <Col md={3}>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Filter by Category</Form.Label>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {getCategories().map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group controlId="stockFilter" className="mb-3">
              <Form.Label>Stock Status</Form.Label>
              <Form.Select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
              >
                <option value="all">All Items</option>
                <option value="low">Low Stock</option>
                <option value="out">Out of Stock</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="search" className="mb-3">
              <Form.Label>Search Products</Form.Label>
              <Form.Control
                type="text"
                placeholder="Search by name or brand"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </FilterForm>
      
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <InventoryTable striped hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>STOCK</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {getFilteredProducts().map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td className="product-name">{product.name}</td>
                <td>{product.brand}</td>
                <td>{product.category}</td>
                <td>${product.price}</td>
                <td>
                  {editMode[product._id] ? (
                    <StockInput
                      type="number"
                      min="0"
                      value={stockUpdates[product._id]}
                      onChange={(e) =>
                        handleStockChange(product._id, e.target.value)
                      }
                    />
                  ) : (
                    product.countInStock
                  )}
                </td>
                <td>{getStockStatus(product.countInStock)}</td>
                <td>
                  {editMode[product._id] ? (
                    <>
                      <Button
                        variant="success"
                        className="btn-sm me-2"
                        onClick={() => handleUpdateStock(product._id)}
                      >
                        <i className="fas fa-save"></i> Save
                      </Button>
                      <Button
                        variant="secondary"
                        className="btn-sm"
                        onClick={() => handleCancelEdit(product._id)}
                      >
                        <i className="fas fa-times"></i> Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="primary"
                      className="btn-sm btn-update"
                      onClick={() => handleEditStock(product._id)}
                    >
                      <i className="fas fa-edit"></i> Update Stock
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </InventoryTable>
      )}
    </PageLayout>
  );
};

export default InventoryScreen; 