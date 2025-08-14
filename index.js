const express = require('express');
const { readFile } = require('./helpers/readFile');
const { sendResponse } = require('./helpers/sendResponse');
const { readData } = require('./middleware/readData');
const { validateEmail } = require('./middleware/validateEmail');
const { validatePassword } = require('./middleware/validatePassword');
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    const html = await readFile('pages', 'index.html');
    sendResponse(res, 200, html, 'text/html');
})

app.get('/api/users', readData, async (req, res) => {
    const { users } = res.locals;
    const { name, age } = req.query;
    let filteredUsers = users;
    if (name) {
        filteredUsers = filteredUsers.filter(user =>
            user.name.toLowerCase().includes(name.toLowerCase())
        );
    }

    if (age) {
        if (age === 'min') {
            filteredUsers = filteredUsers.toSorted((a, b) => a.age - b.age)
        } else if (age === 'max') {
            filteredUsers = filteredUsers.toSorted((a, b) => b.age - a.age)
        }
    }

    if (filteredUsers.length > 0) {
        sendResponse(res, 200, filteredUsers);
    } else {
        sendResponse(res, 404, { message: 'No users found' });
    }
});

app.get('/api/users/:id', readData, async (req, res) => {
    const { id } = req.params;
    const { users } = res.locals;
    const user = users.find(user => user.id === id);

    if (user) {
        sendResponse(res, 200, user);
    } else {
        sendResponse(res, 404, { message: 'User not found' });
    }
});

app.post('/api/login', validateEmail, validatePassword, (req, res) => {
    const user = res.locals.user;
    sendResponse(res, 200, { message: 'Login successful', user });
});

app.use(async (req, res) => {
    const errorPage = await readFile('pages', 'error.html');
    sendResponse(res, 404, errorPage, 'text/html')
});

app.listen(3000, () => console.log('Server is running'))