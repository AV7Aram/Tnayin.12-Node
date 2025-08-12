const sendResponse = (res, statusCode, data, contentType = 'application/json') => {
    res.status(statusCode);
    res.set({
        'Content-Type': contentType,
        'Cache-Control': 'no-store'
    });

    if (contentType === 'application/json' && typeof data === 'object') {
        res.json(data);
    } else {
        res.send(data);
    }
};

module.exports = {
    sendResponse
};
