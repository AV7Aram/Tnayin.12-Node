const { sendResponse } = require('../helpers/sendResponse');

const validatePassword = (req, res, next) => {
    const { password } = req.body;
    const user = res.locals.user;

    if (!password) {
        return sendResponse(res, 400, { message: 'Password is required' });
    }

    if (user.password !== password) {
        return sendResponse(res, 401, { message: 'Invalid password' });
    }

    next();
};

module.exports = {
    validatePassword
};
