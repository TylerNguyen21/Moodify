import React from 'react';
import Pusher from 'pusher-js';


class Bot extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      songs: [],
      mood: '',
      userMsg: '',
      conversation: []
    }
    this.getSongs = this.getSongs.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidMount() {
    const pusher = new Pusher('701886', {
      cluster: 'us2',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
  }

  getSongs() {

  }

  handleInput (e) {
    let change = {};
    change[e.targe.name] = e.target.value
  }

  render () {
    if (this.state.conversation.length === 0) {
      return (
        <div>
          <h1>Welcome to Moodify!  How are you {this.props.name}?</h1>
          <form>
            <input type="text" name="userMsg" onChange={this.handleInput}>
            </input>
          </form>
        </div>
      )
    }
    <div></div>
  }
}


export default Bot;