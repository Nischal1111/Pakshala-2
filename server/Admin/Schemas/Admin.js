const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        // match: [/^[A-Za-z]+$/, 'First name must contain only alphabetical characters']
    },
    lastname: {
        type: String,
        required: true,
        // match: [/^[A-Za-z]+$/, 'Last name must contain only alphabetical characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        match: [
            /^(?=.*[A-Z])(?=.*[!@#$%^&*()-+])(?=.{6,})\S+$/,
            'Password must be at least 6 characters long and contain an uppercase letter and a special symbol'
        ]
    },
    refreshToken: {
        type: String
    },
    codeSixDigit: {
        type: String
    },
});

const Admin = mongoose.model('Admin', AdminSchema);

module.exports = Admin;
