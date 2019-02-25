"use strict";

const express = require('express');
const path = require('path');

const app = new express();

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('bundle.js', function (req, res, next) {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    next();
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

const port = process.env.PORT || 3002;
const env = process.env.NODE_ENV || 'production';

app.listen(port, err => {
    if (err) {
        return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} ${env}`);
});
