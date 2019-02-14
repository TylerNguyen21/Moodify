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
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const pusher = new Pusher('a34279746f39d5fd30e8', {
      cluster: 'us2',
      encrypted: true,
    });

    const channel = pusher.subscribe('bot');
    channel.bind('bot-response', data => {
      const msg = {
        text: data.message,
        playlist: data.playlist,
        playListName: data.name,
        user: 'ai',
      };
      this.setState({
        conversation: [...this.state.conversation, msg],
      });
    });
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

    this.setState({
      conversation: [...this.state.conversation, msg],
    });

    fetch('/moodify', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(msg)
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
    const ChatBubble = (text, i, className, songs, playlist) => {
      return (
        <div key={`${className}-${i}`} className={`${className} chat-bubble`}>
          <span className="chat-content">{text}</span>
          <a href={songs}>{playlist}</a>
        </div>
      );
    };

    const chat = this.state.conversation.map((e, index) =>
      ChatBubble(e.text, index, e.user, e.playlist, e.playListName)
    );

    return (
      <div>
        <h1>Moodify</h1>
        <div className="chat-window">
          <div className="message-box">
            <form onSubmit={(e) => {e.preventDefault(); this.handleSubmit()}}>
              <input
                name='userMsg'
                onChange={this.handleInput}
                className="text-input"
                type="text"
                autoFocus
                placeholder="Type your message and hit Enter to send"
              />
               <input type="submit" ></input>
            </form>
          </div>
          <div className="conversation-view">{chat}</div>
        </div>
      </div>
    );
  }
}


export default Bot;