
const express = require('express');
const tableRoutes = express.Router();

const jwtAuth = require('../Middleware/authMiddleware');

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({})
});


const {
  addTableItem ,
  getTableItems ,
  deleteTableItem ,
  editTableItem,
  updateStatusOfTable
} = require('../Controllers/TableControl');

// tableRoutes.use(jwtAuth)  // all routes are secured

// adding roomitem
tableRoutes.post('/add-table-item', uploader.single('img') ,addTableItem);

// get all room items
tableRoutes.get('/get-table-items', getTableItems);

// delete room item
tableRoutes.delete('/delete-table-item/:id', deleteTableItem);

// edit room item
tableRoutes.patch('/edit-table-item/:id', uploader.single('img'), editTableItem);

// update room status to booked
tableRoutes.patch('/update-status-table/:tableId', updateStatusOfTable);




module.exports = tableRoutes;