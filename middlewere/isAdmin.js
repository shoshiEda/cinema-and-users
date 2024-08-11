const isAdmin = (req, res, next) => {
    const user = req.user
    if (user && user.isAdmin===true) {
        next()
    } else {
        res.status(403).send({ error: "Access denied. Admins only." });
    }
}

module.exports = isAdmin