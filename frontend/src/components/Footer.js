import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'; // Import icons

const Footer = () => {
  return (
    <Wrapper>
      <div className="footer-content">
        <p className="tagline">"Where Flavors Meet Comfort"</p>
        <p className="copyright">
          Copyright &copy; {new Date().getFullYear()} <span>CaféDelight</span>
        </p>
      </div>
      <div className="footer-sections">
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>Email: support@cafedelight.com</p>
          <p>Phone: +91-9876543210</p>
        </div>
        <div className="social-links">
          <h4>Follow Us</h4>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook /> Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram /> Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter /> Twitter
          </a>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  background: var(--clr-black);
  color: var(--clr-white);
  text-align: center;

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    .logo-icon {
      font-size: 2rem;
      color: var(--clr-primary-6);
    }

    h2 {
      font-size: 1.5rem;
      font-weight: bold;
      color: var(--clr-primary-6);
    }
  }

  .footer-content {
    margin-bottom: 1.5rem;

    .tagline {
      font-size: 1.2rem;
      font-weight: bold;
      color: var(--clr-primary-6);
      margin-bottom: 0.5rem;
    }

    .copyright {
      font-size: 0.9rem;
    }
  }

  .footer-sections {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .contact-info,
    .social-links {
      h4 {
        font-size: 1rem;
        margin-bottom: 0.5rem;
        color: var(--clr-primary-6);
      }

      p,
      a {
        font-size: 0.9rem;
        color: var(--clr-white);
        text-decoration: none;
        margin-bottom: 0.3rem;
        display: flex;
        align-items: center;
        gap: 0.5rem; /* Space between icon and text */
      }

      a:hover {
        color: var(--clr-primary-8);
      }
    }
  }

  @media (min-width: 776px) {
    flex-direction: row;
    justify-content: space-between;
    padding: 2rem 4rem;

    .footer-content {
      text-align: left;
    }

    .footer-sections {
      flex-direction: row;
      gap: 2rem;

      .contact-info,
      .social-links {
        align-items: flex-start;
        text-align: left;
      }
    }
  }
`;

export default Footer;
