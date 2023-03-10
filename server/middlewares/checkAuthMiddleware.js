const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// for server
// exports.checkAuth = function checkAuth(req, res, next){
//     try {
//         // Hämtar en "authToken" i våra cookies.
//         const authToken = req.cookies.authToken;
//         // Verifierear tokenen.
//         const loggedInUser = jwt.verify(authToken, secret);
//         req.loggedInUser = loggedInUser;
//         next();
//       } catch (error) {
//         // Om det uppstår en error, skicka en felmeddelande till klienten.
//         res.status(401).json('Authentication error: ' + error.message);
//       }
// };

// for client
exports.checkAuth = function checkAuth(req, res, next){
    
    try {
        const {authToken} = req.body;
        // Verifierear tokenen.
        const loggedInUserToken = jwt.verify(authToken, secret);
        if(!loggedInUserToken){
            res.status(401).json('Wrong token');
            return;
        }
        next();
    } catch (error) {
        res.status(401).json('Authentication error: ' + error.message);
    }
};