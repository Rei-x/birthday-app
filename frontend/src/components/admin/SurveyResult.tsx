import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useApi } from '../../hooks';
import { SurveyResult, UserInterface } from '../../interfaces';
import Loading from '../Loading';

const SurveyResultView = ({ users }: { users: Array<UserInterface> }) => {
  const api = useApi();
  const [result, setResult] = useState<SurveyResult>();
  const [headers, setHeaders] = useState<Array<string>>();

  const getTableHeaders = (data: SurveyResult) => {
    const headersSet: Set<string> = new Set();

    data.Data.forEach((user) => {
      Object.keys(user).forEach((headerName) => {
        headersSet.add(headerName);
      });
    });

    return Array.from(headersSet);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await api?.getSurveyResult();

      if (fetchedData) {
        setResult(fetchedData);

        const allHeaders = getTableHeaders(fetchedData);
        setHeaders(allHeaders);
      }
    };
    fetchData();
  }, [api]);

  return (
    <Container className="overflow-auto">
      {result && headers ? (
        <Table>
          <thead>
            <tr>
              {headers.map((name) => {
                // Don't show comments in table, they are showed later in appropriate cell in tbody
                if (name.includes('Comment')) return undefined;

                return <th key={`${name}-head`}>{name}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {result.Data.map((userData) => (
              <tr key={userData.user}>
                {headers.map((header) => {
                  if (header.includes('Comment')) return undefined;

                  let data = userData[header];

                  if (data === undefined) {
                    data = '';
                  } else if (
                    data === 'other' ||
                    (Array.isArray(data) && data.includes('other'))
                  ) {
                    data = userData[`${header}-Comment`];
                  } else if (header === 'user') {
                    const foundUser = users.find(
                      (user) => user._id === userData.user
                    );

                    data = `${foundUser?.firstName} ${foundUser?.lastName}`;
                  } else if (header === 'Pytanie: Rodzaj alkoholu') {
                    const dataToMap = data.slice(0);
                    data = (
                      <ul>
                        {dataToMap.map((name: string) => (
                          <li key={`${userData.user}-${header}-${name}`}>{name}</li>
                        ))}
                      </ul>
                    );
                  }
                  return <td key={`${userData.user}-${header}`}>{data}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Loading />
      )}
    </Container>
  );
};

export default SurveyResultView;
