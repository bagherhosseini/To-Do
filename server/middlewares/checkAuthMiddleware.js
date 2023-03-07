const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.checkAuth = function checkAuth(req, res, next){
    try {
        // Hämtar en "authToken" i våra cookies.
        const authToken = req.cookies.authToken;

        // Verifierear tokenen.
        const loggedInUser = jwt.verify(authToken, secret);
        req.loggedInUser = loggedInUser;
        next();
      } catch (error) {
        // Om det uppstår en error, skicka en felmeddelande till klienten.
        res.status(401).send('Authentication error: ' + error.message);
      }
};