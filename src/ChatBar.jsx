import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: 'Anonymous',
      content: ''
    };

    this.onEnterUsername = this.onEnterUsername.bind(this);
    this.onEnterMessage = this.onEnterMessage.bind(this);
    this.onHitEnter = this.onHitEnter.bind(this);
  }

  onEnterUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onEnterMessage(event) {
    this.setState({
      content: event.target.value
    })
  }

  onHitEnter(event) {
    if (event.key == 'Enter') {
      console.log('Enter key was pressed');
      this.props.addNewMessage(this.state);
    }
  }

  render() {
    return (
      <footer className="chatbar" onKeyPress={ this.onHitEnter }>
        <input onChange={ this.onEnterUsername }
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input onChange={ this.onEnterMessage }
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    )
  }
}

export default ChatBar;