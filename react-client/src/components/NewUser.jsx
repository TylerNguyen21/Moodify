import React from 'react';
import axios from 'axios';

class NewUser extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      first: true,
      second: false,
      third: false,
      code: ''
    }
    this.enterNumber = this.enterNumber.bind(this);
    this.changeToSecond = this.changeToSecond.bind(this);
    this.changeToThird = this.changeToThird.bind(this);
    this.verify = this.verify.bind(this);
  }

  verify() {
    axios.patch('/verify', {
      phone: this.props.phone,
      code: this.state.code,
      username: this.props.user
    })
    .then(this.changeToThird())
    .catch(alert('Please enter the correct verification number'));
  }

  enterNumber(e) {
    this.setState({
      code: e.target.value
    })
  }

  changeToSecond () {
    this.setState({
      first: false,
      second: true,
      third: false
    })
  }

  changeToThird () {
    this.setState({
      first: false,
      second: false,
      third: true
    })
  }

  render() {
    let {checker, input, home} = this.props
    if (this.state.first) {
      return (
        <div className="login-form">
          <form onSubmit={(e) => {e.preventDefault(); checker(); this.changeToSecond()}}>
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
            <input type="text" name="phone" onChange={input}></input>
            <input type="submit" value="CREATE YOUR ACCOUNT!"></input>
          </form>
        </div>
      )
    } else if (this.state.second) {
        return (
        <form onSubmit={(e)=> {e.preventDefault(); this.verify();}}>
          Enter Verification Number:
          <input type="text" name="verification" onChange={this.enterNumber}></input>
          <input type="submit" value="Verify"></input>
        </form>
        )
      
    } else if (this.state.third){
      return (
        <div>
          <p>Congratulations you are now verified!  Please return to the home screen to login!</p>
          <button value="Click here to return home" onClick={home}/>
        </div>
      )
    }
  }
}

export default NewUser;