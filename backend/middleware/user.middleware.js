const {JWT_SECRET} = require("../config");
const jwt = require('jsonwebtoken')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authirization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(403).json({
            msg: 'No Auth header'
        })
    }

    const token = authHeader.split(' ')[1];

    try {
        const decode = await jwt.verify(token, JWT_SECRET);

        if(decode.userId){
            req.userId = decode.userId;
            next();
        } else {
            res.status(403).json({
                msg: 'Verification failed'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

module.exports = authMiddleware;