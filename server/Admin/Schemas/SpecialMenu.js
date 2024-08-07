const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    public_id: {
        type: String,
        required: true
    }
}, { _id: false });

const specialMenuSchema = new mongoose.Schema({
    item_name : {
        type: String,
        required: true
    },
    item_image: {
        type: ImageSchema,
        required: true
    }
}, {
    timestamps: true
});


const SpecialMenu = mongoose.model('SpecialMenu', specialMenuSchema);

module.exports = SpecialMenu;
