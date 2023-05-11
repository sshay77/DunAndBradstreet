const express = require('express');
const history = require('../history-util');

const router = express.Router();

const { duckApiUrl } = require('../../config');

router.get('/', async (req, res) => {
    const { query, save } = req.query;
    if (save) {
        history.save(query);
    }
    const url = duckApiUrl + encodeURIComponent(query);

    let data;

    try {
        const response = await fetch(url);
        data = await response.json();

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
        return;
    }

    const results = extractResults(data.RelatedTopics);

    res.send({
        success: true,
        data: results
    });
});

// This end point is currently not used by the client
// since this feature is implemented at the get endpoint.
// when the get endpoint receive 'save' query param it save the query 
// to the history file for persistence. 
router.post('/', async (req, res) => {
    const { query } = req.query;
    history.save(query);
    
    const url = duckApiUrl + encodeURIComponent(query);

    let data;

    try {
        const response = await fetch(url);
        data = await response.json();

    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
        return;
    }

    const results = extractResults(data.RelatedTopics);

    res.send({
        success: true,
        data: results
    });
});

function extractResults(relatedTopics) {
    const results = [];

    for (const relatedTopic of relatedTopics) {

        const isCategoryItem = !!relatedTopic.Name;

        if (isCategoryItem) {
            const topics = relatedTopic.Topics;
            const result = topics.map(topic => ({
                URL: topic.FirstURL,
                title: topic.Text
            }
            ));
            results.push(...result);

        } else {
            results.push({
                URL: relatedTopic.FirstURL,
                title: relatedTopic.Text
            });
        }
    }
    return results;
}

module.exports = router;