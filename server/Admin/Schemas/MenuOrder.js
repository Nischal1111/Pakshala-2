const mongoose = require('mongoose');

const MenuOrderSchema = new mongoose.Schema({
    fullName : {
        type: String,
        required: true
    },
    contact :{
        type: String,
        required: true
    },
    order : {
        type: String,
        required: true
    },
    status : {
        type: String,
        default: "Pending",
        enum: ["Pending", "Approved", "Rejected"]
    }
},{
    timestamps: true
});


module.exports = mongoose.model('MenuOrder', MenuOrderSchema);