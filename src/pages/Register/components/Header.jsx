import React from 'react';
import { bool, string } from 'prop-types';

export default function Header(props) {
  const { isloggedIn, username } = props;
  if (isloggedIn) {
    return (
      <h3>
        Hi&nbsp;
        {username}
      </h3>
    );
  }
  return <h3>Create New User</h3>;
}
Header.defaultProps = {
  username: '',
  isloggedIn: false,
};
Header.propTypes = {
  isloggedIn: bool,
  username: string,
};
