import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Modal from '../Modal';
import { useApi } from '../../hooks';

interface InputProps {
  name: string;
  fieldName: string;
}

interface FileInputProps extends InputProps {
  accept: string;
}

const TextInput = ({ name, fieldName }: InputProps) => (
  <Form.Group className="mb-3">
    <Form.Label>{name}</Form.Label>
    <Form.Control
      type="text"
      name={fieldName}
      placeholder={`Enter ${name.toLowerCase()}`}
    />
  </Form.Group>
);

const FileInput = ({ name, fieldName, accept }: FileInputProps) => (
  <Form.Group className="mb-3">
    <Form.Label>{name}</Form.Label>
    <Form.Control name={fieldName} type="file" accept={accept} />
  </Form.Group>
);

interface FormProps {
  update: CallableFunction;
}

const CreateUserForm = ({ update }: FormProps) => {
  const api = useApi();
  const [showModal, setShowModal] = useState(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    await api?.postUser(formData);
    update();
  };

  return (
    <>
      <Form className="w-50" onSubmit={handleSubmit}>
        <TextInput fieldName="username" name="Username" />
        <TextInput fieldName="firstName" name="First name" />
        <TextInput fieldName="lastName" name="Last name" />
        <FileInput
          fieldName="avatar"
          name="Avatar"
          accept=".png, .jpg, .jpeg"
        />
        <FileInput fieldName="video" name="Greeting video" accept=".mp4" />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Modal show={showModal} setShow={setShowModal} heading="Congrats!">
        You just created a new user!
      </Modal>
    </>
  );
};

export default CreateUserForm;
