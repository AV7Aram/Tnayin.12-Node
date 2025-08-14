const { readFile } = require('../helpers/readFile');
const { sendResponse } = require('../helpers/sendResponse');

const validateEmail = async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return sendResponse(res, 400, { message: 'Email is required' });
    }

    try {
        const data = await readFile('db', 'users.json');
        const users = JSON.parse(data);
        const user = users.find(u => u.email === email);

        if (!user) {
            return sendResponse(res, 404, { message: 'Email not found' });
        }

        res.locals.user = user
        next();
    } catch (err) {
        sendResponse(res, 500, { message: 'Error reading user data' });
    }
};

module.exports = {
    validateEmail
};
