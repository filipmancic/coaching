const jwt = require('jsonwebtoken');
const userVerification = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Pristup odbijen, token nije dostavljen.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token nije važeći.' });
        }

        req.user = user; 
        next(); 
    });
};

module.exports = userVerification;
