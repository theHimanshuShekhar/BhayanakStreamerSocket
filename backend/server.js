import express from "express";
import { Server } from 'socket.io';
const app = express();

const PORT = 3000 || process.env.PORT;
const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = new Server(server, {cors: {origin: '*'}});


let userList = [];

// Client connects
io.on('connection', socket => {
    console.log("User connected", socket.id);
    userList.push(socket)

    // Active Clients
    socket.on('count', req=> socket.emit('count', userList.length))

    // User disconnect
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        userList.pop(userList.indexOf(socket));
    });
})
