import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'CaféDelight - Where Flavors Meet Comfort',
  description:
    "CaféDelight is more than just a café; it's a destination where flavors meet comfort. We aim to create a warm and inviting atmosphere for coffee enthusiasts, food lovers, and anyone looking for a cozy retreat. With a diverse menu inspired by regional and global culinary traditions, CaféDelight blends the art of hospitality with exceptional flavors. Whether you’re savoring our handcrafted beverages or indulging in our freshly baked treats, every moment at CaféDelight is designed to be delightful. Join us to experience the essence of café culture, where community and comfort come together.",
  keywords: 'coffee, pastries, café, cozy, beverages, food',
};


export default Meta;
