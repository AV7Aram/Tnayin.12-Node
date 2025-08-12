const express = require('express');
const path = require('path');
const { readFile } = require('./helpers/readFile');
const { sendResponse } = require('./helpers/sendResponse');
const app = express();

app.get('/', async (req, res) => {
    const html = await readFile('pages', 'index.html');
    sendResponse(res, 200, html, 'text/html');
})

app.get('/api/users', async (req, res) => {
    const data = await readFile('db', 'users.json');
    const users = JSON.parse(data);
    sendResponse(res, 200, users);
});

app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const data = await readFile('db', 'users.json');
    const users = JSON.parse(data)
    const user = users.find(user => user.id === id);

    if (user) {
        sendResponse(res, 200, user);
    } else {
        sendResponse(res, 404, { message: 'User not found' });
    }
});

app.use(async (req, res) => {
    const errorPage = await readFile('pages', 'error.html');
    sendResponse(res, 404, errorPage, 'text/html')
});


app.listen(3000, () => console.log('Server is running'))