import React, { Component } from 'react';

import Message from './Message.jsx'

class MessageList extends Component {

  render() {

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