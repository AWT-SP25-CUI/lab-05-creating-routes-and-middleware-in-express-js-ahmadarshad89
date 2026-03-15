const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const loggerMiddleware = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const log = `[${timestamp}] ${req.method} ${req.url}\n`;

    
    console.log(log);

    fs.appendFile(path.join(__dirname, 'requests.log'), log, (err) => {
        if (err) console.log('Log file error:', err);
    });

    next();
};

app.use(loggerMiddleware);

app.get('/', (req, res) => {
    res.json({ message: 'Home Route' });
});

app.get('/about', (req, res) => {
    res.json({ message: 'About Route' });
});

app.listen(3000, () => {
    console.log('Task 1 running at http://localhost:3000');
});