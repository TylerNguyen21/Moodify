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
    this.handleSubmit = this.handleSubmit.bind(this);
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
    change[e.target.name] = e.target.value
    this.setState(change);
  }

  handleSubmit () {
    if (!this.state.userMsg.trim()) {
      return;
    }
    const msg = {
      text: this.state.userMsg,
      user: 'human',
    };
    fetch('/moodify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(msg)
    })
    .then((response) => {
      console.log(response);
    })
    this.setState({
      userMsg: ''
    });
  }

  render () {
    if (this.state.conversation.length === 0) {
      return (
        <div>
          <h1>Welcome to Moodify!  How are you {this.props.name}?</h1>
          <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit()} }>
            <input type="text" name="userMsg" onChange={this.handleInput}>
            </input>
            <input type="submit" ></input>
          </form>
        </div>
      )
    }
    const ChatBubble = (text, i, className) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user)
    );

    return (
      <div>
        <h1>Moodify</h1>
        <div className="chat-window">
          <div className="conversation-view">{chat}</div>
          <div className="message-box">
            <form onSubmit={this.handleSubmit}>
              <input
                name='userMsg'
                onInput={this.handleChange}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}


export default Bot;