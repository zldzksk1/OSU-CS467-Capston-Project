const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //Get token from header
    const token = req.header('x-auth-token');

    //Check if token is valid
    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const jwtSecret = config.get('jwtSecret');
        const decoded = jwt.verify(token, jwtSecret);

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};