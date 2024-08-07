const mongoose = require('mongoose')

const pdfMenu = new mongoose.Schema({
    menu_url: {
        type: String,
        required: true
    },
    menu_public_id: {
        type: String,
        required: true
    }
},{
    id: false,
});

const pdfMenuSchema = new mongoose.Schema({
    menu_file: pdfMenu,
    drink_file: pdfMenu
},{
    timestamps: true
});



const MenuPdf = mongoose.model('MenuPdf', pdfMenuSchema);

module.exports = MenuPdf;
