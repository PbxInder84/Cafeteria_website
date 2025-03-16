import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import styled from 'styled-components';

const SearchForm = styled(Form)`
  display: flex;
  position: relative;
  
  .form-control {
    background-color: rgba(255, 255, 255, 0.1);
    border: none;
    color: #fff;
    width: 200px;
    height: 38px;
    border-radius: 4px;
    padding-right: 40px;
    
    &::placeholder {
      color: rgba(255, 255, 255, 0.7);
    }
    
    &:focus {
      background-color: rgba(255, 255, 255, 0.2);
      box-shadow: none;
    }
  }
  
  .btn {
    position: absolute;
    right: 0;
    top: 0;
    background: transparent;
    border: none;
    color: #fff;
    height: 38px;
    width: 40px;
    
    &:hover, &:focus {
      background-color: transparent;
      color: #6c5ce7;
    }
  }
`;

const AutocompleteList = styled(ListGroup)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 1000;
  max-height: 300px;
  overflow-y: auto;
  margin-top: 5px;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  .list-group-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    
    &:hover {
      background-color: #f8f9fa;
    }
  }
`;

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const autocompleteRef = useRef(null);
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { products } = productList;
  
  useEffect(() => {
    if (keyword.trim().length > 2) {
      dispatch(listProducts(keyword));
      setShowAutocomplete(true);
    } else {
      setShowAutocomplete(false);
    }
  }, [dispatch, keyword]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setShowAutocomplete(false);
    } else {
      navigate('/');
    }
  };
  
  const selectProduct = (productId) => {
    navigate(`/product/${productId}`);
    setShowAutocomplete(false);
    setKeyword('');
  };

  return (
    <div ref={autocompleteRef} style={{ position: 'relative' }}>
      <SearchForm onSubmit={submitHandler}>
        <Form.Control
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search products...'
          value={keyword}
        ></Form.Control>
        <Button type='submit' variant='outline-success'>
          <i className='fas fa-search'></i>
        </Button>
      </SearchForm>
      
      {showAutocomplete && products && products.length > 0 && (
        <AutocompleteList>
          {products.slice(0, 5).map(product => (
            <ListGroup.Item key={product._id} onClick={() => selectProduct(product._id)}>
              {product.name}
            </ListGroup.Item>
          ))}
        </AutocompleteList>
      )}
    </div>
  );
};

export default SearchBox;
