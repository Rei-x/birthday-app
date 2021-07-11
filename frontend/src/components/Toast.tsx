import React, { useState } from 'react';
import { Toast } from 'react-bootstrap';

interface PropTypes {
  title: string
  children: React.ReactNode
}

const CustomToast = ({
  children, title,
}: PropTypes) => {
  const [show, setShow] = useState(true);

  const onClose = () => setShow(false);

  return (
    <Toast show={show} onClose={onClose} delay={6000} autohide>
      <Toast.Header>
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
