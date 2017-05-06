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

  // ----- event handlers for changing username -----

  onEnterUsername(event) {
    this.setState({
      username: event.target.value
    });
  }

  onSubmitUsername(event) {
  // TODO: Add flash messages for better user experience.
  // Currently, submitting a blank form does nothing on front-end.
    if (event.key == 'Enter' && this.state.username !== '') {
      let notification = {
        type: 'postNotification',
        username: this.state.username,
        content: this.state.content
      }
      this.props.addNewNotification(notification);
    } else {
      event.preventDefault();
      console.log('Error: User tried to update username with a blank form. Notification not sent.');
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
    if (event.key == 'Enter' && this.state.content !== '') {
      console.log('Enter key was pressed');
      let formInput = {
        type: 'postMessage',
        username: this.state.username,
        content: this.state.content
      }
      this.props.addNewMessage(formInput);

      // Reset message form field to empty after message is submitted.
      this.setState({
        content: ''
      })
    } else {
      event.preventDefault();
      console.log('Error: User tried to submit message with a blank form. Message not sent.');
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