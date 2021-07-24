import React from 'react';

interface PropTypes {
  url: string;
}

const Avatar = ({ url }: PropTypes) => (
  <img src={url} alt="avatar" className="avatar" />
);

export default Avatar;
