const express = require('express');
const ServerlessHttp = require('serverless-http');

const app = express()
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        'path': 'Home',
        'firstname': 'Joko',
        'lastname': 'Riyadi'
    });
});

router.get('/json', (req, res) => {
    res.json({
        'path': 'Json',
        'author': 'Joko Riyadi'
    });
});

app.use("/", router);

module.exports.handler = ServerlessHttp(app);