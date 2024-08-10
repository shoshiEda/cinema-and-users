const jwt = require('jsonwebtoken');
const secret =process.env.SECRET1 || 'Secret'

const requireAuth = async(req, res, next)=> {
    try{
    if (!req?.cookies?.loginToken) {
        return res.status(401).send('Not Authenticated')
    }
    
    const loggedinUser = validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Not Authenticated')
    if(!loggedinUser.actionsPerDay) return res.status(400).send('You entered the maximum times you could per day')
    req.loggedinUser = loggedinUser
    next()
} catch (err) {
    throw new Error('Not Authenticated');
}
}

const validateToken = async (token) => {
    try {
        const decoded = await jwt.verify(token, secret);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

const processTokenMiddleware = async
{
    try{
    let token = req.cookies.loginToken
    const decodedToken = jwt.decode(token)
    decodedToken.actionsPerDay--
    req.loggedinUser = decodedToken
    next();
} catch (error) {
    console.error('Failed to process token:', error);
    res.status(401).send({ err: 'Failed to process token' });
}
}


module.exports = {requireAuth,processTokenMiddleware}







