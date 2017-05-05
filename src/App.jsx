import React, { Component } from 'react';

import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      currentUser: { name: 'Bob' }, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      value: ''
    };

    this.addNewMessage = this.addNewMessage.bind(this);
  }


  addNewMessage(data) {
    console.log('Adding new messge ...');

    const newMessage = {
      content: data.content,
      type: data.type,
      username: data.username
    }

    console.log('newMessage from "addNewMessage" function in App = ', newMessage);


    this.socket.send(JSON.stringify(newMessage));
  }


  componentDidMount() {
    console.log('componentDidMount <App />');

    this.socket = new WebSocket('ws://localhost:3001');

    this.socket.onopen = function(event) {
      console.log('Connected to server', event);
    }.bind(this);

    this.socket.onmessage = function(event) {
      console.log('this.socket.onmessage "event" =\n', event);

      const data = JSON.parse(event.data);
      console.log('JSON parsed data = ', data);

      switch(data.type) {
        case 'incomingMessage':
          this.setState({
            messages: this.state.messages.concat(data.content)
          });
          break;
        case 'incomingNotification':
          this.setState({
            messages: this.state.messages.concat(data.content)
          });
          break;
        case 'initialState':
          console.log('no messages yet');
          break;
        default:
          // throw new Error('Unknown event type ' + data.type);
          console.log('Unknown event type ' + data.type); //***Fix this
      }
    }
  }


  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <ChatBar
          username={ this.state.currentUser.name }
          addNewMessage={ this.addNewMessage }
          defaultValue={ this.state.currentUser } />
      </div>
    );
  }
}

export default App;
