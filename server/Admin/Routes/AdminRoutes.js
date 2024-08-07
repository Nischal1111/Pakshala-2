const express = require('express');
const adminRoutes = express.Router();

const jwtAuth = require('../Middleware/authMiddleware');

const {
    addAdmin,
    adminLogin,
    refreshAccessToken,
    adminLogout,
    forgotPassword,
    verifyOtpChangePassword
} = require('../Controllers/AdminControl');



// Add new admin
adminRoutes.route('/register-admin').post(addAdmin);

// Login admin
adminRoutes.route('/login-admin').post(adminLogin);


// ==> Secured Routes <==

// Refresh access token
adminRoutes.route('/refresh-token').post(refreshAccessToken);

//logout
adminRoutes.route('/logout-admin').post(jwtAuth ,adminLogout);

//forgot password
adminRoutes.route('/forgot-password').post(forgotPassword);

// verify otp and change password
adminRoutes.route('/verify-otp').patch(verifyOtpChangePassword);

module.exports = adminRoutes;
