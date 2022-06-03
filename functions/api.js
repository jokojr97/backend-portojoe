const express = require('express');
const ServerlessHttp = require('serverless-http');

// mongodb mongoose
require('../utilities/db');
const Portofolio = require('../model/portofolio');

const app = express()
const router = express.Router();

app.use((req, res, next) => {
    req.setHeader('Access-Control-Allow-Origin', '*');
    req.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    req.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
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