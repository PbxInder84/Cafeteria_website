import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: ${({ theme }) => theme.fonts.body};
    color: #333;
    background-color: #f8f9fa;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.heading};
    font-weight: 700;
  }
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: ${({ theme }) => theme.transitions.default};
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
  }
  
  .btn-primary {
    background-color: ${({ theme }) => theme.colors.primary};
    border-color: ${({ theme }) => theme.colors.primary};
    
    &:hover, &:focus, &:active {
      background-color: ${({ theme }) => theme.colors.primaryDark} !important;
      border-color: ${({ theme }) => theme.colors.primaryDark} !important;
    }
  }
  
  .section-padding {
    padding: 5rem 0;
  }
  
  .section-title {
    text-align: center;
    margin-bottom: 3rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -15px;
      left: 50%;
      transform: translateX(-50%);
      width: 70px;
      height: 3px;
      background-color: ${({ theme }) => theme.colors.primary};
    }
  }
  
  /* Add z-index stacking context for proper layering */
  .card-title, .card-text, h1, h2, h3, h4, h5, h6, p {
    position: relative;
    z-index: 5;
  }
  
  /* Ensure text in containers is visible */
  .container, .row, .col {
    position: relative;
    z-index: 3;
  }
  
  /* Make sure form elements are above images */
  form, input, button, select, textarea {
    position: relative;
    z-index: 5;
  }
  
  /* Enhanced z-index stacking for text over images */
  .hero-section, .cta-section {
    h1, h2, h3, h4, h5, h6, p, span, a, button {
      position: relative;
      z-index: 10;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    }
  }
  
  /* Improve contrast for text over images */
  [class*="bg-overlay"] {
    position: relative;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.4);
      z-index: 1;
    }
    
    > * {
      position: relative;
      z-index: 2;
    }
  }
  
  /* Ensure buttons are always clickable */
  button, .btn, a.btn {
    position: relative;
    z-index: 100;
  }
  
  /* Improve text contrast over images */
  .bg-dark, .bg-primary, .bg-secondary, .bg-success, .bg-danger, .bg-warning, .bg-info {
    color: #fff !important;
    
    h1, h2, h3, h4, h5, h6, p, span, a:not(.btn) {
      color: #fff !important;
    }
  }
  
  /* Ensure text over images is white and has proper contrast */
  [class*="overlay"], [style*="background-image"] {
    color: #fff;
    
    h1, h2, h3, h4, h5, h6, p, span {
      color: #fff;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    a:not(.btn) {
      color: #fff;
      text-decoration: underline;
      
      &:hover {
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  
  /* Ensure buttons on dark backgrounds have proper contrast */
  .bg-dark, [class*="overlay"], [style*="background-image"] {
    .btn-outline-light {
      color: #fff;
      border-color: #fff;
      
      &:hover {
        background-color: #fff;
        color: #333;
      }
    }
  }
`;

export default GlobalStyles; 