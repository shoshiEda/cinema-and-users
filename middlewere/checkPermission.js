const jwt = require('jsonwebtoken');
const secret = process.env.SECRET1 || 'Secret';

const checkPermission = (requiredPermission) => (req, res, next) => {

    const user = req.user
    
        if (user.permissions.includes(requiredPermission)) {
            req.user = user;
            next();
        } else {
            res.status(403).send({ error: "Access denied. Insufficient permissions." });
        }
}

module.exports = {checkPermission}
