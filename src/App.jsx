import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Anonymous' }, // Optional. If currentUser is not defined, it means the user is Anonymous.
      messages: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

// ----- Props passed to ChatBar -----

// These two functions format data into a message or a notification,
// set the current state to display the message author (if not null),
// and send the new message/notification to the server to be broadcast.

  addNewMessage(data) {

    console.log('Rcd new messge ...');

    const newMessage = {
      content: data.content,
      type: data.type,
      username: data.username
    }

    console.log('newMessage from "addNewMessage" function in App = ', newMessage);

    this.setState({ currentUser: { name: newMessage.username } });
    this.socket.send(JSON.stringify(newMessage));
  }

  addNewNotification(data) {

    console.log('Rcd new notification ...');

    const newNotification = {
      content: `${this.state.currentUser.name} has changed their name to ${data.username}`,
      type: data.type,
      username: null
    }

    console.log('newNotification from "addNewNotification" function in App = ', newNotification);

    this.setState({ currentUser: { name: data.username } });
    this.socket.send(JSON.stringify(newNotification));
  }
// -----------------------------------

  componentDidMount() {
    console.log('componentDidMount <App />');

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = (event) => {
      console.log('Connected to server', event);
    }

    this.socket.onmessage = (event) => {
      console.log('this.socket.onmessage "event" =\n', event);

      const eventData = JSON.parse(event.data);
      console.log('JSON parsed event data = ', eventData);

      switch(eventData.type) {
        case 'incomingMessage':
          console.log("within incomingMessage");
          this.setState({
            messages: this.state.messages.concat(eventData)
          });
          break;
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(eventData)
          });
          break;
        case 'initialState':
          console.log('no messages yet');
          break;
        default:
          // throw new Error('Unknown event type ' + data.type);
          console.log('Unknown event type ' + eventData.type); //***Fix this
      }
    }
  }


  render() {
    console.log("within App render(), this.state.messages = ", this.state.messages);
    return (
      <div>
        <MessageList
          messages={ this.state.messages }
          notifications={ this.state.notifications }
        />
        <ChatBar
          username={ this.state.currentUser.name }
          addNewMessage={ this.addNewMessage }
          addNewNotification={ this.addNewNotification }
          defaultValue={ this.state.currentUser }
        />
      </div>
    );
  }
}

export default App;
