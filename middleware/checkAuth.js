const { token } = require('../global_keys/keys');

const checkAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== `Bearer ${token}`) {
        res.status(401).json({ message: ' Unathorized ' });
    } else {
        next();
    }
};

module.exports = {
    checkAuth,
};
