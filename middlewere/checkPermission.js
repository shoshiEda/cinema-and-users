const jwt = require('jsonwebtoken');
const secret = process.env.SECRET1 || 'Secret';

const checkPermission = (requiredPermission) => (req, res, next) => {
    const token = req.cookies.loginToken;

    if (!token) return res.status(401).send({ error: "Access denied. No token provided." });

    jwt.verify(token, secret, (err, user) => {
        if (err) return res.status(403).send({ error: "Invalid token." });

        if (user.permissions.includes(requiredPermission)) {
            req.user = user;
            next();
        } else {
            res.status(403).send({ error: "Access denied. Insufficient permissions." });
        }
    })
}

module.exports = {checkPermission}
