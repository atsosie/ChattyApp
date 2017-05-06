import React, { Component } from 'react';

class Message extends Component {

  render() {
  console.log("within Message render(), this.props.username/content = ", this.props.username, this.props.content);
    return (
      <div className="message">
        <span className="message-username">{ this.props.username }</span>
        <span className="message-content">{ this.props.content }</span>
      </div>
    );
  }
}

export default Message;