const express = require('express');
const MenuPdfRoutes = express.Router();

const jwtAuth = require('../Middleware/authMiddleware');

const {
    addMenuPdf,
    getMenuPdfs,
    deleteMenuPdf
} =  require('../Controllers/MenuPdfControl');

const multer = require('multer');

const uploader = multer({
    storage: multer.diskStorage({})
});

// middleware


// Get all menu pdfs
MenuPdfRoutes.route('/get-menu-pdf').get(getMenuPdfs);


// add menu pdf
MenuPdfRoutes.route('/add-menu-pdf').post(jwtAuth,uploader.fields([
    { name: 'file', maxCount: 1 },
    { name: 'drink', maxCount: 1 }
]) 
,addMenuPdf);


// delete menu pdf
MenuPdfRoutes.route('/delete-menu-pdf/:id').delete(jwtAuth,deleteMenuPdf);


module.exports = MenuPdfRoutes;