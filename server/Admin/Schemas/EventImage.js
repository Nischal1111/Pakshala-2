const mongooge = require('mongoose');


const EventImageSchema = new mongooge.Schema({
    image_url : {
        type: String,
        required: true
    },
    image_public_id : {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const EventImage = mongooge.model('EventImage', EventImageSchema);

module.exports = EventImage;

