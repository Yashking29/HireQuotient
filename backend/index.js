import express from 'express';
import dotenv from 'dotenv';
import connectDb from './db/connectDb.js';
import http from 'http';
import { Server } from 'socket.io';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/', authRoutes);


app.get('/test', (req, res) => {
    res.send('API is running...');
});


const server = http.createServer(app);
const io = new Server(server, {
   
    cors: {
      origin: ['http://localhost:5173'],
      credentials: true,
    },
});
connectDb();




// app.listen(process.env.PORT, () => {
//     console.log('Server is running on port 3000');
// });


const socketStatus = new Map();
const sockettouser= new Map();




io.on('connection', (socket) => {
    console.log('New client connected');
    console.log(typeof(socket.id));
    
    const userId = socket.handshake.query.userId;
    const initialStatus = socket.handshake.query.status;
    console.log('User ID:', userId);
    console.log('Status', initialStatus);

    // Store user ID and socket ID in the maps
    sockettouser.set(userId, socket.id);
    socketStatus.set(socket.id, initialStatus);

    // Debugging: Output the contents of the sockettouser map
    for (const [key, value] of sockettouser) {
        console.log(`${key}: ${value}`);
        console.log(typeof(key), typeof(value));
    }

    // Handle disconnection
    socket.on('disconnect', () => {
        // Remove user ID and socket ID from the maps on disconnect
        sockettouser.delete(userId);
        socketStatus.delete(socket.id);
        console.log('Client disconnected');
    });

    // Handle incoming messages
    socket.on('message', ({ data, status, reciever }) => {
        console.log(typeof(reciever), typeof(userId), typeof(data));
        console.log(socket.id, data, status, reciever);
        
        // Convert reciever to a string if it's not already
        const recieverString = reciever.toString();
        
        // Retrieve the recipient's socket ID from the sockettouser map
        let recipientSocketId;
        for (const [key, value] of sockettouser) {
            console.log(key, recieverString);
            if(key=="'"+recieverString+"'"){
                console.log("found");
                io.to(value).emit('message', data);
            }
            console.log(`${key}: ${value}`);
            console.log(typeof(key), typeof(value));
        }
        console.log(recieverString, sockettouser[recieverString],sockettouser.get("sushant"));
        
        
        // Check if recipient's socket ID exists
        if (recipientSocketId) {
            // Emit the message to the recipient
            io.to(recipientSocketId).emit('message', data);
        } else {
            console.log('Recipient not found or not connected');
            // Handle the case when the recipient is not found
        }
    });
   
    // Handle status updates
    socket.on('status', (status) => {
        // Update status in the socketStatus map
        socketStatus.set(socket.id, status.st);
        console.log(userId, sockettouser.get(userId), status.st);
    });
});











server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
