
const express = require('express');
const menuRoutes = express.Router();

const multer = require('multer');

const jwtAuth = require('../Middleware/authMiddleware');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addMenuItem ,
  getMenuItems ,
  deleteMenuItem
} = require('../Controllers/MenuControl');


// middleware
// menuRoutes.use(jwtAuth);


// adding menu item
menuRoutes.post('/add-menu-item', uploader.single('img') ,jwtAuth,addMenuItem);

// get all menu items
menuRoutes.get('/get-menu-items', getMenuItems);

// delete menu item
menuRoutes.delete('/delete-menu-item/:id',jwtAuth, deleteMenuItem);




module.exports = menuRoutes;