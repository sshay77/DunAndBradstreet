const serverPort = 5000;

// cors configuration:
const clientPort = 5173;
const clientOrigin = `http://localhost:${clientPort}`;

const duckApiUrl = 'http://api.duckduckgo.com/?format=json&q=';

module.exports = {
    serverPort,
    clientOrigin,
    duckApiUrl
};