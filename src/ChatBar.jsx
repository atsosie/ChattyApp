import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.username,
      content: ''
    };

    this.onEnterUsername = this.onEnterUsername.bind(this);
    this.onSubmitUsername = this.onSubmitUsername.bind(this);

    this.onEnterMessage = this.onEnterMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  // ---------- CHANGE USERNAME ---------- //

  onEnterUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onSubmitUsername(event) {
    if (event.key == 'Enter') {
      let notification = {
        type: 'postNotification',
        username: this.state.username,
        content: this.props.username + ' has changed to ' + this.state.username
      }
      this.props.addNewMessage(notification);
    }
  }

  // ---------- SUBMIT MESSAGE ---------- //

  onEnterMessage(event) {
    this.setState({
      content: event.target.value
    })
  }

  onSubmitMessage(event) {
    if (event.key == 'Enter') {
      console.log('Enter key was pressed');
      let formInput = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
      this.props.addNewMessage(formInput);
      this.setState({
        content: ''
      })
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input
          onKeyUp={ this.onSubmitUsername }
          onChange={ this.onEnterUsername }
          value={ this.state.username }
          className="chatbar-username"
          placeholder="Your Name (Optional)"
        />
        <input
          onKeyUp={ this.onSubmitMessage }
          onChange={ this.onEnterMessage }
          value={ this.state.content }
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    )
  }
}

export default ChatBar;