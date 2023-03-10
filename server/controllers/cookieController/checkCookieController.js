const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.checkCookie = function checkCookie(req, res){
    const {authToken} = req.body;
    try {
        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        console.log(loggedInUserToken);
        if(!loggedInUserToken){
            res.status(401).json('Wrong token');
            return;
        }
        res.status(200).json('successful');
    } catch (error) {
        res.status(401).json('Authentication error: ' + error.message);
    }
};