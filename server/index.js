const express = require('express');
const cors = require('cors');

const serverPort = 5000;
const dukApiUrl = 'http://api.duckduckgo.com/?format=json&q=';

const clientPort = 5173;
const clientOrigin = `http://localhost:${clientPort}`;

const app = express();

app.use(express.json());
app.use(cors({ origin: clientOrigin }));

app.get('/', async (req, res) => {
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

    const results = [];

    for (const relatedTopic of data.RelatedTopics) {
        
        const isCategoryItem = !!relatedTopic.Name;
        if (isCategoryItem) {
            const topics = relatedTopic.Topics;
            const result = topics.map(topic => ({
                URL: topic.FirstURL,
                title: topic.Text
            }
            ));
            results.push(...result);

        }else {
            results.push({
                URL: relatedTopic.FirstURL,
                title: relatedTopic.Text
            });
        }
    }

    res.send({
        success: true,
        data: results
    });
});

app.listen(serverPort, () => {
    console.log(`server app listening on port ${serverPort}`);
});