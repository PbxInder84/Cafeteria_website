import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/about-img.jpg";

const About = () => {
  return (
    <Wrapper className="section">
      <div className="section-center">
        <img src={aboutImg} alt="about-img" />
        <article>
          <div className="title">
            <h2>about us</h2>
            <div className="underline"></div>
          </div>
          <p>
            <strong>CaféDelight</strong> is a café platform that seeks to
            redefine the café culture by bridging the gap between urban and
            semi-urban communities through innovative offerings. By providing a
            welcoming space for indulgence, creativity, and community
            engagement, this platform aims to celebrate the art of culinary
            excellence and hospitality.
            <br />
            India's culinary heritage is both diverse and unique, and when
            combined with regional flavors and traditional techniques, it offers
            a competitive advantage in the café industry. With the right support
            and a focus on quality, the café market has the potential to grow
            exponentially. A systematic approach that highlights the
            authenticity of ingredients, fosters creativity in menu design, and
            promotes exceptional customer service will pave the way for success.
            <br />
            As the café industry evolves and garners attention, leveraging
            digital platforms for online visibility, seamless customer
            experiences, and operational efficiency will be a key driver of
            growth. **CaféDelight** envisions becoming a preferred destination
            where flavors meet comfort, creating memorable moments for its
            patrons.
          </p>
        </article>
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
    img {
      width: 100%;
      display: block;
      border-radius: var(--radius);
      height: 500px;
      object-fit: contain;
    }
    p {
      line-height: 2;
      max-width: 45em;
      margin: 0 auto;
      margin-top: 2rem;
      color: var(--clr-grey-5);
      text-transform: normal;
    }
    .title {
      text-align: left;
    }
    .underline {
      margin-left: 0;
    }
    @media (min-width: 992px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 1280px) {
    padding-top: 12rem;
  }
`;

export default About;
