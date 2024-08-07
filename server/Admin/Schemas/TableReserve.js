const mongoose = require('mongoose');

const TableReserveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    reserveDate: {
        type: Date,
        required: true
    },
    reserveTime: {
        type: String,
        required: true
    },
    guestsNumber: {
        type: Number,
        required: true
    },
    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tables',
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Declined']
    }
});


module.exports = mongoose.model('TableReserve', TableReserveSchema);
