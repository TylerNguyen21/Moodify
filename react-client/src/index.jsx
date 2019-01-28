import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
      mood: '',
      oldUser: false,
      newUser: false,
      loggedIn: false,
      userName: '',
      password: '',
      confirmPass: '',
      email: '',
      usersList: [],
      name: ''
    }
    this.getUsers = this.getUsers.bind(this);
    this.handleUser = this.handleUser.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.login = this.login.bind(this);
    this.accountCreation = this.accountCreation.bind(this);
    this.userNameChecker = this.userNameChecker.bind(this);
    this.passwordChecker = this.passwordChecker.bind(this);
  }

  componentDidMount() {
    // this.getUsers();
  }

  getUsers () {
    fetch('/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then ((users) => {
      console.log(users);
    })
  }

  login () {
    let checker = {
      'username': this.state.userName,
      'password': this.state.password
    }
    fetch('/login', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(checker)
    })
  }

  handleUser (button) {
    let formChanger = {}
    formChanger[button] = true;
    this.setState(formChanger);
  }

  handleInput () {
    let change = {}
    change[e.target.name] = e.target.value;
    this.setState(change)
  }

  userNameChecker () {
    if (usersList.includes(this.state.userName)) {
      alert(`The username you have chosen has already been taken`)
      return
    } else {
      this.accountCreation()
    }
  }

  passwordChecker () {
    if (this.state.password !== this.state.confirmPass) {
      alert('Please make sure your confirmed password matches!')
      return
    }
    this.userNameChecker()
  }

  accountCreation() {
    let account = this;
    let info = {
      username: this.state.userName,
      name: this.state.name,
      password: this.state.password,
      email: this.state.email
    };
    fetch('/creation', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(info)
    })
    .then(() => {
      alert('Congratulations you have made your account!');
      account.setState({
        user: account.state.name
      })
    });
  }


  render () {
    if (this.state.oldUser === false && this.state.newUser === false) {
      return (
        <div className="login-form">
          <button name="oldUser" onClick={(e) => {e.preventDefault(); this.handleUser('oldUser')}}>Existing User</button>
          <button name="newUser" onClick={(e) => {e.preventDefault(); this.handleUser('newUser')}}>Create a new account!</button>
        </div>
      )
    }
    if (this.state.oldUser === true  && this.state.loggedIn === false) {
      return (
        <div className="login-form">
          <form onSubmit={(e) => {e.preventDefault(); this.login()}}>
            Username:
            <input type="text" name="userName" onChange={this.handleInput}></input>
            Password:
            <input type="text" name="password" onChange={this.handleInput}></input>
            <input type="submit" value="Login"></input>
          </form>
        </div>
      )
    }
    if (this.state.newUser === true  && this.state.loggedIn === false) {
      return (
        <div className="login-form">
          <form onSubmit={(e) => {e.preventDefault(); this.passwordChecker()}}>
            Name:
            <input type="text" name="name" onChange={this.handleInput}></input>
            Username:
            <input type="text" name="userName" onChange={this.handleInput}></input>
            Email:
            <input type="text" name="email" onChange={this.handleInput}></input>
            Password:
            <input type="text" name="password" onChange={this.handleInput}></input>
            Confirm Password:
            <input type="text" name="confirmPass" onChange={this.handleInput}></input>
            <input type="submit" value="CREATE YOUR ACCOUNT!"></input>
          </form>
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));