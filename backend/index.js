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


const myMap = new Map();




io.on('connection', (socket) => {
    console.log('New client connected');
    myMap.set(socket.id, socket);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('message', (data) => {
        console.log(socket.id, data);
        io.emit('message', data); // Broadcast message to all clients
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
