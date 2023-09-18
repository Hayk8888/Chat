const express = require('express');
const authRouter = require('./router/auth');
const cors = require('cors')
const http = require('http'); // Import the 'http' module
const socketIo = require('socket.io'); // Import 'socket.io' module
const bodyParser = require('body-parser');


require('dotenv').config();
require('./db/database')();

const {createServer} = require("http");
const app = express();
const port = 5000

const whitelist = [
    "http://localhost:5173/chat",
];

const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: '*',
    },
});

io.on('connection', (socket) => {
    socket.on('message', msg => {
        io.emit('message', msg);
    });
});


const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your client's origin URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());
app.use('/', authRouter);
app.use(bodyParser.json());

server.listen(port, () => {
    console.log(`server listen in ${port}`)
})