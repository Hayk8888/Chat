const express = require('express');
const authRouter = require('./router/auth');
const cors = require('cors')
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');


require('dotenv').config();
require('./db/database')();


const app = express();
const port = 5000

const server = http.createServer(app);


const io = socketIo(server, {
    cors: {
        origin: '*',
    },
    maxHttpBufferSize: 1e8
});


require('./controllers/mesageController')(io);


const corsOptions = {
    origin: 'http://localhost:5173',
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