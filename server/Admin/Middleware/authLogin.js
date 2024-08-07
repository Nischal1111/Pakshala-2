const Admin = require('../Schemas/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authLogin = async (email, password) => {
    try {
        // Check if email and password are provided
        if (!email || !password) {
            return { success: false, message: 'All fields are required' };
        }

        // Find admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Compare passwords
        const isPasswordMatch = bcrypt.compareSync(password, admin.password);
        if (!isPasswordMatch) {
            return { success: false, message: 'Invalid email or password' };
        }

        // Generate tokens
        const accessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        // Update admin document with new refresh token
        admin.refreshToken = refreshToken;
        await admin.save();

        return { success: true, accessToken, refreshToken, admin };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Internal server error' };
    }
};

module.exports = authLogin;
