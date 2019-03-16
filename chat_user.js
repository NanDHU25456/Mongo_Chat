const mongoose = require('mongoose');
const Chat = require('./models/Chat')
const client = require('socket.io').listen(4000).sockets;

// Connect to Socket.io
client.on('connection', function (socket) {

    // Create function to send status
    sendStatus = function (s) {
        socket.emit('status', s);
    }

    // Get chats from mongo collection
    Chat.find()
        .limit(100)
        .then(chats => {
            socket.emit('output', chats)
        })

    // Handle input events
    socket.on('input', function (data) {
        let name = data.name;
        let message = data.message;

        // Check for name and message
        if (name == '' || message == '') {
            // Send error status
            sendStatus('Please enter a name and message');
        } else {
            // Insert message
            new Chat({
                    name,
                    message
                }).save()
                .then(() => {
                    client.emit('output', [data])
                    // Send status object
                    sendStatus({
                        message: 'Message sent',
                        clear: true
                    });
                })
        }
    });

    // Handle clear
    socket.on('clear', function (data) {
        // Remove all chats from collection
        Chat.remove({})
            .then(() => {
                // Emit cleared
                socket.emit('cleared');
            })
    });
});