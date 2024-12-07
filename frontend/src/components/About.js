import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/about-img.jpg";

const About = () => {
  return (
    <Wrapper className="section">
      <div className="section-center">
        <ImageWrapper>
          <img src={aboutImg} alt="about our cafeteria" />
        </ImageWrapper>
        <Content>
          <div className="title">
            <h2>about our cafeteria</h2>
            <div className="underline"></div>
          </div>
          <p>
            <strong>CafeteriaDelight</strong> is dedicated to creating a vibrant
            and inclusive space where food, culture, and community come
together. Our cafeteria offers a perfect blend of traditional and modern
dining experiences, ensuring there’s something for everyone to savor.
Whether it’s the smell of freshly brewed coffee, the taste of handcrafted
pastries, or hearty meals made with locally sourced ingredients, we aim to
delight your senses.
            <br />
            Our mission is to redefine cafeteria culture by fostering connections
            and celebrating culinary diversity. By incorporating innovative menu
            options and promoting sustainable practices, we hope to provide not
            just a meal but a memorable experience for all our visitors.
            <br />
            At <strong>CafeteriaDelight</strong>, we believe that every meal is an
            opportunity to create lasting memories. Join us for a unique
            experience where comfort, quality, and community take center stage.
          </p>
        </Content>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  background: var(--clr-grey-10);

  .section-center {
    display: grid;
    place-items: center;
    gap: 4rem;

    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1280px) {
    padding-top: 12rem;
  }
`;

const ImageWrapper = styled.div`
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
`;

const Content = styled.article`
  .title {
    text-align: left;
  }

  .underline {
    margin-left: 0;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
    text-transform: none;
  }
`;

export default About;
