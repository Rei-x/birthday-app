import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ModalProps {
  show: boolean
  setShow: React.Dispatch<React.SetStateAction<boolean>>
  heading: React.ReactNode
  children: React.ReactNode
}

const ModalAlert = ({
  show, setShow, heading, children,
}: ModalProps) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{heading}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAlert;
