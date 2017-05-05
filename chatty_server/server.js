const express = require('express');
const SocketServer = require('ws');
const uuid = require('node-uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

function broadcast(data) {

  wss.clients.forEach((ws) => {
    // console.log('These should be equal: ', ws.readyState, SocketServer.OPEN);

    if (ws.readyState === SocketServer.OPEN) {

      let stringifiedData = JSON.stringify(data);
      ws.send(stringifiedData);
    }
  });
}

wss.on('connection', (ws) => {
  console.log('Client connected');

  let message = {
    type: 'initialState',
    content: '',
    username: ''
  }
  broadcast(message);

  ws.on('message', (message) => {
    let parsedMessage = JSON.parse(message);
    console.log(`User ${parsedMessage.username} said ${parsedMessage.content}`);

    switch(parsedMessage.type) {
      case 'postNotification':
        parsedMessage.type = 'incomingNotification';
        break;
      case 'postMessage':
        parsedMessage.type = 'incomingMessage';
        parsedMessage.id = uuid.v1();
        break;
      case 'initialState':
        parsedMessage.type = 'initialState';
        break;
      default:
        //throw new Error('Unknown event type ' + message.type)
        console.log('Unknown event type ' + message.type); //***Fix this
    }

    broadcast(parsedMessage);
  });

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected');
    let message = {
      id: '',
      content: '',
      username: ''
    }
    broadcast(message);
  });
});