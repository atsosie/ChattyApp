import React, { Component } from 'react';

import Message from './Message.jsx'
import Notification from './Notification.jsx'

class MessageList extends Component {

  render() {
    console.log("within MessageList render(), this.props.messages = ", this.props.messages);
    console.log("within MessageList render(), this.props.notifications = ", this.props.notifications);

    return (
      <main className="messages">
        <div className="message"> {
          this.props.messages.map((currentMessage) => {
            return <Message
                      key={ currentMessage.id }
                      username={ currentMessage.username }
                      content={ currentMessage.content }
                    />
          })}
        </div>
        <div className="message system"> {
          this.props.notifications.map((currentNotification) => {
            return <Notification
                      key={ currentNotification.id }
                      content={ currentNotification.content }
                    />
          })}
        </div>
      </main>
    )
  }
}

export default MessageList;