const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(cors({ origin: '*' }));


const PORT = process.env.SERVER_PORT ?? 5000;

app.listen(PORT, () => {
  console.warn(`Server is listen port: ${ PORT }`);
})