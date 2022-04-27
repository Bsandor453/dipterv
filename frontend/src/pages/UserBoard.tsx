import { RouteComponentProps } from 'react-router';
import React, { useEffect, useState } from 'react';
import TestService from '../services/TestService';

const UserBoard: React.FC<RouteComponentProps<any>> = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    TestService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) || error.message || error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{JSON.stringify(content)}</h3>
      </header>
    </div>
  );
};

export default UserBoard;
