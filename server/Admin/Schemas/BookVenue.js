const moongoose = require('mongoose');

const bookVenueSchema = new moongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Approved', 'Declined']
    }
});

const BookVenue = moongoose.model('BookVenue', bookVenueSchema);

module.exports = BookVenue;