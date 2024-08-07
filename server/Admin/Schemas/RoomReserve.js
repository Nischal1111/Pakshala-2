const mongoose = require('mongoose');

const roomReserveSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    contact : {
        type: String,
        required: true
    },
    checkInDate: {
        type: Date,
        required: true
    },
    checkOutDate: {
        type: Date,
        required: true
    },
    roomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Rejected']
    }
}, {
    timestamps: true
});

const RoomReserve = mongoose.model('RoomReserve', roomReserveSchema);

module.exports = RoomReserve;