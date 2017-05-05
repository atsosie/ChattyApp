import React, { Component } from 'react';

import Message from './Message.jsx'

class MessageList extends Component {

  render() {

    return (
      <main className="messages">
        {
          this.props.messages.map((currentMessage, idx) => {
            return <Message message={currentMessage} key={idx} />
          })
        }
      </main>
    )
  }
}

export default MessageList;