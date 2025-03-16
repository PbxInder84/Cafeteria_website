import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ 
  title = 'CaféDelight | Premium Coffee Experience',
  description = 'Discover premium coffee blends, freshly baked goods, and a cozy atmosphere at CaféDelight',
  keywords = 'coffee, cafe, bakery, premium coffee, fresh bakes, coworking space'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

export default Meta; 