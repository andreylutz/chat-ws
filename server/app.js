const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const { router } = require('./route');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: [
      'GET',
      'POST'
    ]
  }
})

app.use(cors({ origin: '*' }));
app.use(router)


const PORT = process.env.SERVER_PORT ?? 5000;

app.listen(PORT, () => {
  console.warn(`Server is listen port: ${ PORT }`);
})