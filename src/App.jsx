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

    const newMessage = {
      content: data.content,
      type: data.type,
      username: data.username
    }

    this.setState({ currentUser: { name: newMessage.username } });
    this.socket.send(JSON.stringify(newMessage));
  }


  addNewNotification(data) {

    const newNotification = {
      content: data.content,
      type: data.type,
      username: null
    }

    this.setState({ currentUser: { name: data.username } });
    this.socket.send(JSON.stringify(newNotification));
  }

// ------------------------------------------------

  componentDidMount() {

    this.socket = new WebSocket('ws://localhost:3001');


    this.socket.onopen = (event) => {
      console.log('Connected to server');
    }

    this.socket.onmessage = (event) => {

      const eventData = JSON.parse(event.data);

      switch(eventData.type) {
        case 'incomingMessage':
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
          throw new Error('Unknown event type ' + eventData.type);
      }
    }
  }


  render() {

    return (
      <div>
        <NavBar
          imageSrc="../build/chatty-app-logo.png"
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
