import React, { useCallback, useContext, useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../../contexts";
import { useApi } from "../../hooks";
import { UserInterface } from "../../interfaces";
import { CreateUserForm, UsersTable } from "../../components";

const Dashboard = () => {
  const [context] = useContext(UserContext);
  const [, api] = useApi(context);
  const [users, setUsers] = useState<Array<UserInterface> | undefined>();

  const getUserTable = useCallback(async () => {
    const fetchedUsers = await api?.getUsers();
    setUsers(fetchedUsers?.docs);
  }, [api]);

  useEffect(() => {
    getUserTable();
  }, [getUserTable]);

  return (
    <Container style={{ marginTop: "100px" }}>
      <Row className="vertical-center">
        <h1>Create user</h1>
        <CreateUserForm update={getUserTable} />
        {users ? (
          <UsersTable users={users} update={getUserTable} />
        ) : (
          <h1>Loading...</h1>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
