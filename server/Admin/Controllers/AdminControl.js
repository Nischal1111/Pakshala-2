const Admin = require('../Schemas/Admin');
const authLogin = require('../Middleware/authLogin');

const bcrypt = require('bcrypt');
const { sendOtp } = require('../../Utils/MailSend');
const jwt = require('jsonwebtoken');


// Add New Admin 

const addAdmin = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // // Validate email format using regex
        // if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        //     return res.status(400).json({ success: false, message: 'Please fill a valid email address' });
        // }

        // // Validate password format using regex
        // if (!/^(?=.*[A-Z])(?=.*[!@#$%^&*()-+])(?=.{6,})\S+$/.test(password)) {
        //     return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long and contain an uppercase letter and a special symbol' });
        // }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const newAdmin = await Admin.create({
            firstname:firstName,
            lastname:lastName,
            email,
            password: hashedPassword,
            refreshToken: ''
        });

        if (!newAdmin) {
            return res.status(400).json({ success: false, message: 'Error adding admin' });
        }

        const resAdmin = await Admin.findById(newAdmin._id).select(
            "-password -refreshToken"
        )
        
        if (!resAdmin) {
            return res.status(400).json({ success: false, message: 'Error adding admin' });
        }

        res.status(201).json({ success: true,resAdmin, message: 'Admin added successfully' });

    } catch (error) {
        console.log(error); 
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


//admin login 


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const authResult = await authLogin(email, password);

        if (!authResult.success) {
            return res.status(400).json({ success: false, message: authResult.message });
        }

        const loggedInUser = await Admin.findById(authResult.admin._id).select("-password -refreshToken")

        // Set cookies and send response
        res.cookie('refreshToken', authResult.refreshToken, {
            httpOnly: true,
            // sameSite: 'none',
            expires: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
        });

        res.cookie('accessToken', authResult.accessToken, {
            httpOnly: false,
            // sameSite: 'none',
            expires: new Date(new Date().getTime() + 60 * 60 * 1000)
        });

        res.status(200).json({ success: true, loggedInUser ,message: 'Login Successful.' });
    } catch (error) {
        console.log(error); 
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


// refresh ascess token

const refreshAccessToken = async(req, res) => {
    try {
        const { refreshToken } = req.cookies || req.body.refreshToken;
        if (!refreshToken) {
            return res.status(400).json({ success: false, message: 'No refresh token provided' });
        }

        const decodedToken = jwt.verify(refreshToken, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).json({ success: false, message: 'Invalid refresh token' });
        }

        const admin = await Admin.findById(decodedToken.id);
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        if(admin.refreshToken !== refreshToken) {
            return res.status(400).json({ success: false, message: 'Invalid refresh token' });
        }


        // Generate new access token
        const accessToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: 'none',
            expires: new Date(new Date().getTime() + 60 * 60 * 1000)
        });

        res.status(200).json({ success: true, refreshToken, accessToken ,message: 'Access token refreshed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}



//logout
const adminLogout = async(req, res) => {
    try {
        // Get admin id from authMiddleware
        const userId = req.admin._id;

        //for finding the admin
        const admin = await Admin.findById(userId);
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        //removing refresh token from the database
        admin.refreshToken = '';
        await admin.save();

        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.status(200).json({ success: true, message: 'Logout Successful' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(400).json({ success: false, message: 'Invalid email' });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '5m' });

        // Create a 6-digit random number
        const random = Math.floor(100000 + Math.random() * 900000);
        const codeSix = random.toString();
        
        admin.codeSixDigit = codeSix;
        await admin.save();
        // Send email
        sendOtp({ email,codeSix:codeSix });

        res.status(200).json({ success: true, message: 'Check your mail for OTP code', token });
    } catch (error) {
        // console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


//verify otp and change password
const verifyOtpChangePassword = async (req, res) => {
    try {
        const { otpCode, token, password } = req.body;

        console.log(otpCode, token, password);

        if (!otpCode || !token || !password) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(400).json({ success: false, message: 'Unauthorized access' });
        }

        const admin = await Admin.findById(decodedToken.id);
        if (!admin) {
            return res.status(400).json({ success: false, message: 'User Not Found' });
        }

        let isMatch
        if(admin.codeSixDigit === otpCode){
            isMatch = true;
        }else{
            isMatch = false;
        }
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid Code' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt); 
        admin.password = hashedPassword;
        admin.codeSixDigit = '';
        await admin.save();

        res.status(200).json({ success: true, message: 'Password changed successfully' });
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(400).json({ success: false, message: 'Token is Expired' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


module.exports = {
    addAdmin,
    adminLogin,
    refreshAccessToken,
    adminLogout,
    forgotPassword,
    verifyOtpChangePassword
}

