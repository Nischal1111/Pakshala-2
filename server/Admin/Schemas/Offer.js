const mongoose = require('mongoose');

const OfferSchema = new mongoose.Schema({
    offer_image_url: {
        type: String,
        required: true
    },
    offer_image_Id: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Offer = mongoose.model('Offer', OfferSchema);


module.exports = Offer;