const express = require('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

const PORT = 3001;

const server = express()
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server.
const wss = new SocketServer.Server({ server });

// When a client connects, they are assigned a socket,
// represented by the 'ws' parameter in the callback.
// ws = client


function broadcast(data) {
  wss.clients.forEach((ws) => {
    if (ws.readyState === SocketServer.OPEN) {
      ws.send(JSON.stringify(data));
    }
  });
}


// Call this function when new client is connected and again when client closes the socket.
// This lets App know the value of userCount has changed.
// Message 'type' must be included so App knows how to handle this message event.
function updateUserCount() {
  let userCountUpdate = {
    type: 'userCountUpdate',
    value: wss.clients.size
  }
  broadcast(userCountUpdate);
}


wss.on('connection', (ws) => {

  updateUserCount();

  ws.on('message', (message) => {
  // When server receives output from 'addNewMessage' function in App,
  // that output is parsed, given a message type, then broadcast.

    let parsedMessage = JSON.parse(message);

    switch(parsedMessage.type) {
      case 'initialState':
        parsedMessage.type = 'initialState';
        break;
      case 'postMessage':
        parsedMessage.type = 'incomingMessage';
        parsedMessage.id = uuid.v1();
        console.log(`User ${parsedMessage.username} said ${parsedMessage.content}`);
        break;
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        parsedMessage.id  = uuid.v1();
        console.log(`${parsedMessage.content}`);
        break;
      default:
        throw new Error('Unknown event type ' + message.type)
    }

    broadcast(parsedMessage);
  });


  ws.on('close', () => {

    userCount = wss.clients.size;
    updateUserCount();

  });
});