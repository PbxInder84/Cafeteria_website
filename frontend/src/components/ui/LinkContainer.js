import React from 'react';
import { Link } from 'react-router-dom';

export const LinkContainer = ({ to, children, ...rest }) => {
  // Clone the child element and add the Link's props
  const child = React.Children.only(children);
  
  return React.cloneElement(child, {
    ...rest,
    as: props => <Link to={to} {...props} />,
  });
}; 