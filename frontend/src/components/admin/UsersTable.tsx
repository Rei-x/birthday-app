import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Dropdown,
  Table,
  InputGroup,
  FormControl,
  Button,
  Overlay,
  Tooltip,
  Form,
} from 'react-bootstrap';
import { FiSettings } from 'react-icons/fi';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Modal from '../Modal';
import { UserContext } from '../../contexts';
import { useApi } from '../../hooks';
import { UserInterface } from '../../interfaces';
import { getUrl } from '../../utils';

interface TableProps {
  users: Array<UserInterface>;
  update: CallableFunction;
}

const UsersTable = ({ users, update }: TableProps) => {
  const [showModal, setShowModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [context] = useContext(UserContext);
  const api = useApi();
  const copyButton = useRef(null);

  const generateInviteLink = async (userId: string) => {
    if (!api) return;
    const fetchedToken = await api.getInviteLink(userId);
    const url = getUrl();
    setInviteLink(`${url}/invite/${fetchedToken}`);
    setShowModal(true);
  };

  const deleteUser = async (userId: string) => {
    if (context.addNotification)
      context.addNotification('Success', <p>User has been deleted</p>);
    await api?.deleteUser(userId);
    update();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    userId: string
  ) => {
    const fileInput = event.target;
    const { files } = fileInput as any;

    const formData = new FormData();
    formData.append('video', files[0]);

    const result = await api?.updateUser(formData, userId);
    if (context.addNotification) {
      const title = result ? 'Success' : 'Error';
      const message = result
        ? 'User has been updated'
        : 'Something went wrong during updating';
      context.addNotification(title, message);
    }
    update();
  };

  useEffect(() => {
    if (!showModal) setShowTooltip(false);
  }, [showModal]);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Avatar</th>
            <th>Attendance</th>
            <th>Greeting video</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: UserInterface) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.avatar}</td>
              <td>
                <Form.Check
                  type="checkbox"
                  disabled
                  checked={user.hasConfirmedAttendance === 'yes'}
                />
              </td>
              <td>
                {user.video ? (
                  <a
                    href={api?.getVideoLink(user._id)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    video
                  </a>
                ) : (
                  <Form.Control
                    name="video"
                    type="file"
                    accept=".mp4"
                    onChange={(event) => handleFileChange(event, user._id)}
                  />
                )}
              </td>
              <td>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    <FiSettings size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">
                      Edit information
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => generateInviteLink(user._id)}>
                      Generate invite link
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => deleteUser(user._id)}>
                      Delete user
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} setShow={setShowModal} heading="Invite link">
        Here you have your invite link!
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Invite link"
            aria-label="Invite link"
            aria-describedby="copyButton"
            value={inviteLink}
            disabled
          />
          <CopyToClipboard
            text={inviteLink}
            onCopy={() => setShowTooltip(true)}
          >
            <Button ref={copyButton} variant="outline-primary" id="copyButton">
              Copy
            </Button>
          </CopyToClipboard>
          <Overlay
            target={copyButton.current}
            show={showTooltip}
            placement="right"
          >
            {({ ref, style }) => (
              <Tooltip id="button-tooltip" ref={ref} style={style}>
                Coppied
              </Tooltip>
            )}
          </Overlay>
        </InputGroup>
      </Modal>
    </>
  );
};

export default UsersTable;
