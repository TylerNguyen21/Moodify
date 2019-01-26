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
      loggedin: false
    }
    this.handleUser = this.handleUser.bind(this);
  }

  handleUser (e) {
    let formChanger = {}
    formChanger[e.target.name] = true;
    this.setState(formChanger);
  }

  render () {
    if (this.state.oldUser === false && this.state.newUser === false) {
      return (
        <div className="login-form">
          <button name="oldUser" onClick={(e) => {e.preventDefault(); handleUser()}}>Existing User</button>
          <button name="newUser" onClick={(e) => {e.preventDefault(); handleUser()}}>Create a new account!</button>
        </div>
      )
    }
    if (this.state.oldUser === true) {
      return (
        <div className="login-form">

        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));