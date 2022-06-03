const express = require('express');
const ServerlessHttp = require('serverless-http');

// mongodb mongoose
require('../utilities/db');
const Portofolio = require('../model/portofolio');

const app = express()
const router = express.Router();

router.get('/', (req, res) => {
    Portofolio.find().then((portof) => {
        res.send(portof)
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