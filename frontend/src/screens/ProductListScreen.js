import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import PageLayout from '../components/layout/PageLayout';
import styled from 'styled-components';

const ProductsTable = styled(Table)`
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
  
  .product-id {
    font-family: monospace;
    font-weight: 600;
    font-size: 0.9rem;
  }
  
  .product-name {
    font-weight: 600;
    color: #333;
  }
  
  .product-price {
    font-weight: 700;
    color: #6c5ce7;
  }
  
  .btn-edit {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
  
  .btn-delete {
    background-color: #e74c3c;
    border-color: #e74c3c;
    
    &:hover {
      background-color: #c0392b;
      border-color: #c0392b;
    }
  }
`;

const ActionButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-weight: 600;
  margin-right: 0.5rem;
  
  &:last-child {
    margin-right: 0;
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const CreateButton = styled(Button)`
  background-color: #6c5ce7;
  border-color: #6c5ce7;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  
  &:hover {
    background-color: #5649c0;
    border-color: #5649c0;
  }
  
  i {
    margin-right: 0.5rem;
  }
`;

const ProductListScreen = () => {
  const { pageNumber = 1 } = useParams();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts('', pageNumber));
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdProduct,
    pageNumber,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <PageLayout 
      title="Products" 
      breadcrumbItems={[
        { name: 'Admin', link: '/admin' },
        { name: 'Products', link: '' }
      ]}
    >
      <Row className="align-items-center mb-4">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          <CreateButton onClick={createProductHandler}>
            <i className="fas fa-plus"></i> Create Product
          </CreateButton>
        </Col>
      </Row>
      
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="danger">{errorCreate}</Message>}
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <ProductsTable striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="product-id">{product._id}</td>
                  <td className="product-name">{product.name}</td>
                  <td className="product-price">${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <ActionButton variant="primary" className="btn-sm btn-edit">
                        <i className="fas fa-edit"></i> Edit
                      </ActionButton>
                    </LinkContainer>
                    <ActionButton
                      variant="danger"
                      className="btn-sm btn-delete"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i> Delete
                    </ActionButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </ProductsTable>
          <Paginate pages={pages} page={page} isAdmin={true} />
        </>
      )}
    </PageLayout>
  );
};

export default ProductListScreen;
