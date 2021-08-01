import React, { useEffect, useState } from 'react';
import { Badge, Container } from 'react-bootstrap';
import { Avatar } from '../components';
import { useApi } from '../hooks';
import { UserPaginatedUsers } from '../interfaces';

const GuestsList = () => {
  const [users, setUsers] = useState<UserPaginatedUsers['docs'] | undefined>();
  const api = useApi();

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await api?.getUsers();
      if (fetchedUsers) setUsers(fetchedUsers.docs);
    };
    fetchUsers();
  }, [api]);

  return (
    <Container>
      <h1 className="text-center">Lista gości</h1>
      {users &&
        users.map((user) => (
          <div className="d-flex guest-list__item">
            <Avatar url={api?.getAvatarUrl(user.username) || ''} />
            <div>
              <h5>
                {user.firstName} {user.lastName}
              </h5>
            </div>
            <Badge bg="success">Będzie</Badge>
          </div>
        ))}
    </Container>
  );
};

export default GuestsList;
