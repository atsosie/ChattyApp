import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import NavBar from './NavBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {}, // Optional. If currentUser is not defined, it means the user is Anonymous.
      messages: [],
      userCount: 0
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

// ----- functions passed to ChatBar as props -----

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
      content: data.content,
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
      console.log('***onMessage: JSON parsed event data = ', eventData);

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
        case 'userCountUpdate':
          this.setState({
            userCount: eventData.value
          })
          break;
        default:
          throw new Error('Unknown event type ' + data.type);
      }
    }
  }


  render() {
    console.log("within App render(), this.state.messages = ", this.state.messages);
    return (
      <div>
        <NavBar
          userCount={ this.state.userCount }
        />
        <MessageList
          messages={ this.state.messages }
        />
        <ChatBar
          username={ this.state.currentUser.name }
          addNewMessage={ this.addNewMessage }
          addNewNotification={ this.addNewNotification }
        />
      </div>
    );
  }
}

export default App;
