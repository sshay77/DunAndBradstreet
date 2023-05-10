const express = require('express');
const history = require('../history-util');

const router = express.Router();

router.get('/', async (req, res) => {
    const _history = await history.load();
    res.send({
        success: true,
        data: _history
    });
});

module.exports = router;