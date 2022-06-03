const express = require('express');
const ServerlessHttp = require('serverless-http');

// mongodb mongoose
require('../utilities/db');
const Portofolio = require('../model/portofolio');

const app = express()
const router = express.Router();

router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

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