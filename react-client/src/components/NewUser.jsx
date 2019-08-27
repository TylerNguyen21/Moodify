import React from 'react';

const NewUser = (props) => {
  let {checker, input} = props
  return (
    <div className="login-form">
      <form onSubmit={(e) => {e.preventDefault(); checker()}}>
        Name:
        <input type="text" name="name" onChange={input}></input>
        Username:
        <input type="text" name="userName" onChange={input}></input>
        Email:
        <input type="text" name="email" onChange={input}></input>
        Password:
        <input type="password" name="password" onChange={input}></input>
        Confirm Password:
        <input type="password" name="confirmPass" onChange={input}></input>
        Mobile Phone:
        <input type="tel" name="phone" onChange={input}></input>
        <input type="submit" value="CREATE YOUR ACCOUNT!"></input>
      </form>
    </div>
  )
}

export default NewUser;