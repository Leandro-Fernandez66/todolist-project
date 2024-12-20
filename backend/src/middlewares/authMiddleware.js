const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = req.headers['authorization']?.split(' ')[1];
    console.log('token', token);

    if (!token) {
        return res.status(403).json({ message: 'token not provided' });
    }

    if (secretKey) {
        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    }
}

module.exports = {
    verifyToken
};
