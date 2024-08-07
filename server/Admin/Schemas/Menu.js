const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
    item_name: {
        type: String,
        required: true
    },
    item_price: {
        type: Number,
        required: true
    },
    item_image: {
        type: String,
        required: true
    },
    item_offer_price_percentage: {
        type: Number,
        default: 0,
        required: true
    },
    item_category: {
        type: String,
        required: true
    },
    isOfferActive: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


const Menu = mongoose.model('Menu', MenuSchema);

module.exports = Menu;
