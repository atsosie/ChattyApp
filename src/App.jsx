import React, { Component } from 'react';

import MessageList from './MessageList.jsx'
import ChatBar from './ChatBar.jsx'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?"
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };

    this.addNewMessage = this.addNewMessage.bind(this);
  }

  // componentDidMount() {

  // }

  addNewMessage(event) {
    console.log(event);
    const newMessage = {
      id: this.state.messages.length + 1,
      username: event.username,
      content: event.content
    }

    const message = this.state.messages.concat(newMessage);
    this.setState({ messages: message })
  }

  render() {
    return (
      <div>
        <MessageList messages={ this.state.messages } />
        <ChatBar addNewMessage={ this.addNewMessage } defaultValue={ this.state.currentUser } />
      </div>
    );
  }
}

export default App;
