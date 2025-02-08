const jwt = require('jsonwebtoken')

const ensureAuthenticated = (req,res,next) =>{
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).
        json({ message : 'UnAuthorize, JWT token is required'})
    }
    try {
        const decoded = jwt.verify(auth, process.env.NODE_JWT_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
    return res.status(403)
    .json({message: 'Expired or wrong JWT Token'})
    }
}

module.exports = ensureAuthenticated;