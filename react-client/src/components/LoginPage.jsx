import React from 'react';

const LoginPage = (props) => {
  let {user} = props;
    return (
      <div className="login-form">
        <button name="oldUser" onClick={(e) => {e.preventDefault(); user('oldUser')}}>Existing User</button>
        <button name="newUser" onClick={(e) => {e.preventDefault(); user('newUser')}}>Create a new account!</button>
      </div>
    )
}

export default LoginPage; 