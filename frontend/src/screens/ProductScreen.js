import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PageLayout from '../components/layout/PageLayout'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import styled from 'styled-components'
import ReviewList from '../components/reviews/ReviewList'
import ReviewForm from '../components/reviews/ReviewForm'

const ProductImage = styled(Image)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`

const ProductInfo = styled(ListGroup)`
  .list-group-item {
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    
    &:first-child {
      padding-top: 0;
    }
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  h3 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`

const PriceCard = styled(Card)`
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  border: none;
  
  .list-group-item {
    padding: 1rem;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .btn-primary {
    background-color: #6c5ce7;
    border-color: #6c5ce7;
    padding: 0.75rem;
    font-weight: 600;
    
    &:hover {
      background-color: #5649c0;
      border-color: #5649c0;
    }
  }
`

const ReviewSection = styled.div`
  margin-top: 3rem;
  
  h2 {
    font-weight: 700;
    margin-bottom: 1.5rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 0;
      width: 50px;
      height: 3px;
      background-color: #6c5ce7;
    }
  }
  
  .list-group-item {
    padding: 1.5rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
      border-bottom: none;
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
`

const BackButton = styled(Link)`
  display: inline-block;
  margin-bottom: 1.5rem;
  color: #666;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #6c5ce7;
    transform: translateX(-5px);
  }
  
  i {
    margin-right: 5px;
  }
`

const ProductScreen = () => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(id))
  }, [dispatch, id, successProductReview])

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(id, {
        rating,
        comment,
      })
    )
  }

  return (
    <PageLayout 
      title={loading ? 'Product Details' : product.name}
      breadcrumbItems={[
        { name: 'Home', link: '/' },
        { name: 'Products', link: '/products' },
        { name: loading ? 'Product Details' : product.name, link: '' }
      ]}
    >
      <BackButton to="/">
        <i className="fas fa-arrow-left"></i> Back to Products
      </BackButton>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Col md={6}>
              <ProductImage src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ProductInfo variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Price:</strong> ${product.price}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Description:</strong> {product.description}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Brand:</strong> {product.brand}
                </ListGroup.Item>
              </ProductInfo>
            </Col>
            <Col md={3}>
              <PriceCard>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <span className="text-success">In Stock</span>
                        ) : (
                          <span className="text-danger">Out Of Stock</span>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(Math.min(product.countInStock, 10)).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block w-100"
                      type="button"
                      disabled={product.countInStock === 0}
                    >
                      <i className="fas fa-shopping-cart me-2"></i>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </PriceCard>
            </Col>
          </Row>
          
          <ReviewSection>
            <Row>
              <Col md={6}>
                <h2>Reviews</h2>
                {userInfo ? (
                  <ReviewForm 
                    submitHandler={(reviewData) => {
                      dispatch(
                        createProductReview(id, {
                          rating: reviewData.rating,
                          comment: reviewData.comment,
                        })
                      );
                    }}
                  />
                ) : (
                  <Message>
                    Please <Link to="/login">sign in</Link> to write a review
                  </Message>
                )}
              </Col>
              <Col md={12}>
                <ReviewList 
                  reviews={product.reviews} 
                  title={`Reviews (${product.reviews.length})`}
                  showVerified={true}
                />
              </Col>
            </Row>
          </ReviewSection>
        </>
      )}
    </PageLayout>
  )
}

export default ProductScreen
