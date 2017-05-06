import React, { Component } from 'react';

import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      notifications: []
    };

    this.addNewMessage = this.addNewMessage.bind(this);
    this.addNewNotification = this.addNewNotification.bind(this);
  }

  addNewMessage(data) {
  // Define 'newMessage' object using data from ChatBar
  // then send that object to the server to be broadcast

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
      type: data.type
    }

    console.log('newNotification from "addNewNotification" function in App = ', newNotification);

    this.setState({ currentUser: { name: data.username } });
    this.socket.send(JSON.stringify(newNotification));
  }


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
            notifications: this.state.notifications.concat(eventData)
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
          addNewMessage={ this.addNewMessage.bind(this) }
          addNewNotification={ this.addNewNotification.bind(this) }
          defaultValue={ this.state.currentUser }
        />
      </div>
    );
  }
}

export default App;
