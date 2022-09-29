const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization ? req.headers.authorization.split(" ")[1] : null;
        if (!token) {
            throw new Error('Token isn\'t valid!')
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {
            _id: decodedToken._id,
            email: decodedToken.email,
            role: decodedToken.role
        }
        next();

    } catch (error) {
        return res.status(401).json({
            status: false,
            data: {
                msg: "Invaild token, unauthorized!"
            }
        })
    }
}
