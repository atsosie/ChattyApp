import React, { Component } from 'react';

import Message from './Message.jsx'

class MessageList extends Component {

  render() {
    console.log("within MessageList render(), this.props.messages = ", this.props.messages);
    console.log("within MessageList render(), this.props.notifications = ", this.props.notifications);
    // Extract message object from array of messages
    const currentMessage = this.props.messages.map((currentMessage) => {
      return <Message
                content={ currentMessage.content }
                key={ currentMessage.id }
                type={ currentMessage.type }
                username={ currentMessage.username }
              />
    })

    return (
      <main className="messages">
        { currentMessage }
      </main>
    )
  }
}

export default MessageList;