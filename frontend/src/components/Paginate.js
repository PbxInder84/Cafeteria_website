import React from 'react'
import { Pagination } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const StyledPagination = styled(Pagination)`
  margin-top: 2rem;
  justify-content: center;
  
  .page-item {
    margin: 0 3px;
    
    .page-link {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #333;
      border: none;
      
      &:focus {
        box-shadow: none;
      }
    }
    
    &.active .page-link {
      background-color: #6c5ce7;
      color: #fff;
    }
  }
`;

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <StyledPagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item 
            key={x + 1}
            active={x + 1 === page}
            as={Link}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/page/${x + 1}`
                  : `/page/${x + 1}`
                : `/admin/productlist/${x + 1}`
            }
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </StyledPagination>
    )
  )
}

export default Paginate
