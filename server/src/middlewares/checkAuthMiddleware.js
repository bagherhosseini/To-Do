const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// for client
exports.checkAuth = function checkAuth(req, res, next){
    
    try {
        const {authToken} = req.cookies;
        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        if(!loggedInUserToken){
            res.status(401).json('Token not found');
            return;
        }
        next();
    } catch (error) {
        res.status(401).json('Authentication error: ' + error.message);
    }
};