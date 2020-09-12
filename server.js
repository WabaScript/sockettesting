// Create express app, always specify port
const express = require('express');
const PORT = process.env.PORT || 4000;

// Built in Node package to create server
const http = require('http');
// Init server using the express app
const app = express();
const server = http.createServer(app);

// Set Static Folder
app.use(express.static(__dirname));


// Bring in and init websocket server
const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

// What happens when a connection to the wss occurs, or a message is received
// Check for connection
wss.on('connection', function connection(ws) {
    
    // Check for message
    ws.on('message', function incoming(data) {
        // Relay message to all connections
        wss.clients.forEach(client => {
            // Ensure data will be sent to other clients that are listening
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        });
    });
});

// Run server at specfied port
server.listen(PORT, () => {console.log(`Server listening at port ${PORT}`)})