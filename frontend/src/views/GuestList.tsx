import React, { useEffect, useState } from 'react';
import { Badge, Container } from 'react-bootstrap';
import { Loading, Avatar } from '../components';
import { useApi } from '../hooks';
import { UserPaginatedUsers } from '../interfaces';

const GuestsList = () => {
  const [users, setUsers] = useState<UserPaginatedUsers['docs'] | undefined>();
  const [loading, setLoading] = useState(true);
  const api = useApi();

  const getAttendanceBadge = (attendance: 'yes' | 'idk' | 'no') => {
    let bgColor: 'success' | 'light' | 'danger';
    let message: 'Będzie' | 'Nie zadeklarował(a)' | 'Nie będzie';

    switch (attendance) {
      case 'yes':
        bgColor = 'success';
        message = 'Będzie';
        break;
      case 'no':
        bgColor = 'danger';
        message = 'Nie będzie';
        break;
      default:
        bgColor = 'light';
        message = 'Nie zadeklarował(a)';
        break;
    }

    return <Badge bg={bgColor}>{message}</Badge>;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await api?.getUsers();
      if (fetchedUsers) setUsers(fetchedUsers.docs);
      setLoading(false);
    };
    fetchUsers();
  }, [api]);

  return loading ? (
    <Loading />
  ) : (
    <Container className="navbar-margin d-flex flex-column align-items-center">
      <h1 className="text-center">Lista gości</h1>
      <div className="guest-list__wrapper">
        {users &&
          users.map((user) => (
            <div
              key={user.username}
              className="d-flex guest-list__item align-items-center"
            >
              <Avatar url={api?.getAvatarUrl(user.username) || ''} />
              <div className="mx-3">
                <h5 className="guest-list__name">
                  {user.firstName} {user.lastName}
                </h5>
              </div>
              {getAttendanceBadge(user.hasConfirmedAttendance)}
            </div>
          ))}
      </div>
    </Container>
  );
};

export default GuestsList;
