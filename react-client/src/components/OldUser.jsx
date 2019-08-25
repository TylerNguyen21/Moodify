import React from 'react';

const OldUser = (props) => {
  let {input, login} = props;
  return (
    <div className="login-form">
      <form onSubmit={(e) => {e.preventDefault(); login()}}>
        Username:
        <input type="text" name="userName" onChange={input}></input>
        Password:
        <input type="text" name="password" onChange={input}></input>
        <input type="submit" value="Login"></input>
      </form>
    </div>
  )
}

export default OldUser