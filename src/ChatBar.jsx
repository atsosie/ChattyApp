import React, { Component } from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      content: ''
    };

    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleSubmitUsername = this.handleSubmitUsername.bind(this);

    this.onEnterMessage = this.onEnterMessage.bind(this);
    this.onSubmitMessage = this.onSubmitMessage.bind(this);
  }

  // ----- event handlers for changing username -----

  handleChangeUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  handleSubmitUsername(event) {
    if (event.key == 'Enter') {
      console.log('Enter key was pressed');
      console.log('A name was changed: ' + this.state.username);

      let notification = {
        type: 'postNotification',
        username: this.state.username,
        content: `${this.props.username} has changed their name to ${this.state.username}`
      }

      if (!this.state.username) {
        event.preventDefault();
        console.log('Shhh: user is going ghost protocol')
      } else {
        this.props.addNewNotification(notification);
      }
    }
  }


  // ----- event handlers for sending message -----

  onEnterMessage(event) {
    this.setState({
      content: event.target.value
    })
  }

  onSubmitMessage(event) {
  // TODO: Add flash messages for better user experience.
  // Currently, submitting a blank form does nothing on front-end.
    if (event.key == 'Enter') {
      console.log('Enter key was pressed');

      if (!this.state.content) {
        event.preventDefault();
        console.log('Error: User tried to submit message with a blank form. Message not sent.');
      } else {
        let newMessge = {
          type: 'postMessage',
          username: this.state.username,
          content: this.state.content
        }
        if (!this.state.username) {
          newMessge.username = 'Anonymous';
        }
        this.props.addNewMessage(newMessge);
        // Reset message form field to empty after message is submitted.
        this.setState({
          content: ''
        })
      }
    }
  }


  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          onChange={ this.handleChangeUsername }
          onKeyUp={ this.handleSubmitUsername }
          placeholder="Your Name (Optional)"
          value={ this.state.username }


        />
        <input
          className="chatbar-message"
          onChange={ this.onEnterMessage }
          onKeyUp={ this.onSubmitMessage }
          placeholder="Type a message and hit ENTER"
          value={ this.state.content }
        />
      </footer>
    )
  }
}

export default ChatBar;