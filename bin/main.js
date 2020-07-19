const http = require('http');
const ServerHandle = require('../app');
const PORT = 5005;

const SERVER = http.createServer(ServerHandle);

SERVER.listen(PORT);