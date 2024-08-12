const express = require('express');
const SpecialMenuRoutes = express.Router();

const multer = require('multer');

const jwtAuth = require('../Middleware/authMiddleware');

const{
    getSpecialMenuItems,
    addSpecialMenuItem,
    deleteSpecialMenuItem

} = require('../Controllers/SpecialMenuControl');

const uploader = multer({
    storage: multer.diskStorage({})
});

// middleware
// SpecialMenuRoutes.use(jwtAuth);




// Get all special menu items
SpecialMenuRoutes.route('/get-special-menu').get(getSpecialMenuItems);


// add special menu items
SpecialMenuRoutes.route('/add-special-menu').post(uploader.single('img') , addSpecialMenuItem);


// delete special menu item
SpecialMenuRoutes.route('/delete-special-menu/:id').delete(deleteSpecialMenuItem);




module.exports = SpecialMenuRoutes

