const express = require('express');
const cors = require('cors');
const searchRouter = require('./routes/search/search');
const historyRouter = require('./routes/history/history')
const { serverPort, clientOrigin } = require('./config');

const app = express();

app.use(express.json());
app.use(cors({ origin: clientOrigin }));

app.use('/search', searchRouter);
app.use('/history', historyRouter);

app.listen(serverPort, () => {
    console.log(`server app listening on port ${serverPort}`);
});
