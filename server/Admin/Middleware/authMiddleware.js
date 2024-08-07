
const jwt = require('jsonwebtoken');
const Admin = require('../Schemas/Admin');

const jwtAuth =  async (req, res, next) => {

    try {
        // console.log(req.cookies);
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if(!token) {
            return res.status(401).json({ success: false, message: 'Invalid Token' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!decodedToken) {
            return res.status(401).json({ success: false, message: 'Unauthorized Access' });
        }

        const admin = await Admin.findById(decodedToken.id);
        if(!admin) {
            return res.status(401).json({ success: false, message: 'Invalid Access Token' });
        }

        req.admin = admin;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

module.exports = jwtAuth;