
const express = require('express');
const roomRoutes = express.Router();

const jwtAuth = require('../Middleware/authMiddleware');

const multer = require('multer');

const uploader= multer({
    storage: multer.diskStorage({}),
});


const {
  addRoom,
  getRooms,
  deleteRoom,
  editRoom,
  updateStatusOfRoom
} = require('../Controllers/RoomControl');

// roomRoutes.use(jwtAuth)  // all routes are secured


// adding room item


  roomRoutes.route('/add-room').post(
    uploader.fields([
      { name: 'img1', maxCount: 1 },
      { name: 'img2', maxCount: 1 },
      { name: 'img3', maxCount: 1 },
      { name: 'img4', maxCount: 1 }
    ]),
    addRoom);

// get all room items
roomRoutes.get('/get-rooms', getRooms);

// delete room item
roomRoutes.delete('/delete-room/:id',jwtAuth, deleteRoom);

// edit room item
roomRoutes.patch('/update-room/:id', uploader.fields([
  { name: 'img1', maxCount: 1 },
  { name: 'img2', maxCount: 1 },
  { name: 'img3', maxCount: 1 },
  { name: 'img4', maxCount: 1 }
]),jwtAuth, editRoom);

//for updating status
roomRoutes.route("/update-status-room/:id").patch(jwtAuth,updateStatusOfRoom)


module.exports = roomRoutes;