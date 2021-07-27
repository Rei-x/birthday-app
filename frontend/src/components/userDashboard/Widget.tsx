import React from 'react';

interface PropTypes {
  children: React.ReactNode;
  className?: string;
}

const Widget = ({ children, className }: PropTypes) => (
  <div className={`widget ${className}`}>{children}</div>
);

Widget.defaultProps = {
  className: '',
};

export default Widget;
