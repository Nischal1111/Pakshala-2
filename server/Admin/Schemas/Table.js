const mongoose = require('mongoose');

const TablesSchema = new mongoose.Schema({
    table_name: {
        type: String,
        required: true
    },
    table_image: {
        type: {
            url: {
                type: String,
                required: true
            },
            public_id: {
                type: String,
                required: true
            },
        
        },
        required: true
    },
    table_category: {
        type: String,
        required: true
    },
    table_guests: {
        type: Number,
        required: true
    },
    tableStatus: {
        type: String,
        default: 'Available',
        enum: ['Available', 'Pending' ,'Booked']
    }

},
{
    timestamps: true
});


const Tables = mongoose.model('Tables', TablesSchema);

module.exports = Tables;
