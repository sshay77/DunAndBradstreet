const express = require('express');
const router = express.Router();

const { dukApiUrl } = require('../config');

router.get('/', async (req, res) => {
    const { query: q = 'test' } = req.query;
    const url = dukApiUrl + encodeURIComponent(q);

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

    const results = exractResults(data.RelatedTopics);

    res.send({
        success: true,
        data: results
    });
});

function exractResults(relatedTopics) {
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