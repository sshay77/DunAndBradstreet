const express = require('express');
const cors = require('cors');
const searhRouter = require('./routes/search');

const { serverPort, clientOrigin } = require('./config');

const app = express();

app.use(express.json());
app.use(cors({ origin: clientOrigin }));

app.use('/search', searhRouter);

app.listen(serverPort, () => {
    console.log(`server app listening on port ${serverPort}`);
});
