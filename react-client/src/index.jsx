import React from 'react';
import ReactDOM from 'react-dom';
import Bot from './components/Bot.jsx';
import LoginPage from './components/LoginPage.jsx';
import OldUser from './components/OldUser.jsx';
import NewUser from './components/NewUser.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      user: '',
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
    this.getUsers();
  }

  getUsers () {
    fetch('/users', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then ((users) => {
      return users.json();
    })
    .then((data)=> {
      let accounts = [];
      for (let x =0; x < data.length; x+=1) {
        accounts.push(data[x].username);
      }
      this.setState({
        usersList: accounts
      })
    })
  }

  login () {
    let checker = {
      'username': this.state.userName,
      'password': this.state.password
    }
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(checker)
    })
    .then((answer) => {
      let data = answer.json();
      return data;
    })
    .then((info) => {
      let person = info[0].name
        this.setState({
          loggedIn: true,
          name: person
        });
    })
    .catch((error) => {
      console.log(error);
      alert('You have the wrong username/password combination')
    })
  }

  handleUser (button) {
    let formChanger = {}
    formChanger[button] = true;
    this.setState(formChanger);
  }

  handleInput (e) {
    let change = {}
    change[e.target.name] = e.target.value;
    this.setState(change)
  }

  userNameChecker () {
    if (this.state.usersList.includes(this.state.userName)) {
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
        user: account.state.name,
        loggedIn: true
      });
    })
    .catch((error) => {
      alert('Uh-oh! Something went wrong');
    });
  }


  render () {
    if (this.state.oldUser === false && this.state.newUser === false) {
      return (
        <LoginPage user={this.handleUser}/>
      )
    }
    if (this.state.oldUser === true  && this.state.loggedIn === false) {
      return (
        <OldUser login={this.login} input={this.handleInput}/>
      )
    }
    if (this.state.newUser === true  && this.state.loggedIn === false) {
      return (
        <NewUser checker={this.passwordChecker} 
                   input={this.handleInput}/>
      )
    }
    if(this.state.loggedIn === true) {
      return (
        <Bot name={this.state.name} />
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));