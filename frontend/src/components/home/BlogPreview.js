import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const BlogContainer = styled.section`
  padding: 6rem 0;
  background-color: #fff;
`;

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 700;
  color: #333;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 3px;
    background-color: #6c5ce7;
  }
`;

const BlogCard = styled(Card)`
  border: none;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
  }
  
  .card-body {
    padding: 1.5rem;
  }
  
  .card-title {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  .card-text {
    color: #666;
    margin-bottom: 1rem;
  }
  
  .blog-meta {
    display: flex;
    justify-content: space-between;
    color: #999;
    font-size: 0.9rem;
    margin-bottom: 1rem;
    
    span {
      display: flex;
      align-items: center;
      
      i {
        margin-right: 5px;
      }
    }
  }
`;

const ReadMoreLink = styled(Link)`
  color: #6c5ce7;
  font-weight: 600;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  
  &:hover {
    color: #5649c0;
    transform: translateX(5px);
  }
  
  i {
    margin-left: 5px;
    transition: all 0.3s ease;
  }
  
  &:hover i {
    transform: translateX(3px);
  }
`;

const ViewAllLink = styled(Link)`
  display: inline-block;
  margin-top: 3rem;
  color: #6c5ce7;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    color: #5649c0;
    transform: translateX(5px);
  }
  
  i {
    margin-left: 5px;
  }
`;

const BlogPreview = () => {
  const blogPosts = [
    {
      id: 1,
      title: 'The Art of Coffee Brewing: Tips from Our Baristas',
      excerpt: 'Discover the secrets to brewing the perfect cup of coffee at home with expert tips from our professional baristas.',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085',
      date: 'August 15, 2023',
      author: 'James Wilson',
      slug: 'art-of-coffee-brewing'
    },
    {
      id: 2,
      title: 'Coffee Bean Origins: A Journey Around the World',
      excerpt: "Take a virtual tour of the world's most renowned coffee-growing regions and learn what makes each origin unique.",
      image: 'https://images.unsplash.com/photo-1611854779393-1b2da9d400fe',
      date: 'July 28, 2023',
      author: 'Maria Rodriguez',
      slug: 'coffee-bean-origins'
    },
    {
      id: 3,
      title: 'Pairing Coffee with Desserts: A Match Made in Heaven',
      excerpt: 'Learn how to enhance your coffee experience by pairing different coffee varieties with complementary desserts.',
      image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e',
      date: 'July 10, 2023',
      author: 'David Chen',
      slug: 'coffee-dessert-pairing'
    }
  ];
  
  return (
    <BlogContainer>
      <Container>
        <SectionTitle>Latest from Our Blog</SectionTitle>
        <Row>
          {blogPosts.map((post) => (
            <Col lg={4} md={6} className="mb-4" key={post.id}>
              <BlogCard>
                <Card.Img variant="top" src={post.image} alt={post.title} />
                <Card.Body>
                  <div className="blog-meta">
                    <span><i className="far fa-calendar"></i> {post.date}</span>
                    <span><i className="far fa-user"></i> {post.author}</span>
                  </div>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.excerpt}</Card.Text>
                  <ReadMoreLink to={`/blog/${post.slug}`}>
                    Read More <i className="fas fa-arrow-right"></i>
                  </ReadMoreLink>
                </Card.Body>
              </BlogCard>
            </Col>
          ))}
        </Row>
        <div className="text-center">
          <ViewAllLink to="/blog">
            View All Blog Posts <i className="fas fa-arrow-right"></i>
          </ViewAllLink>
        </div>
      </Container>
    </BlogContainer>
  );
};

export default BlogPreview; 