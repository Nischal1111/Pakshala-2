
const express = require('express');
const router = express.Router();

const { 
    addRoomReserve,
    getRoomReserves, 
    acceptRoomReservation,
    rejectRoomReservation
} = require('../Controllers/RoomReserveControl');

const jwtAuth = require('../Middleware/authMiddleware');




//routes

router.post('/request-room-reserve/:id', addRoomReserve);


router.get('/get-room-reserves',jwtAuth ,getRoomReserves);

router.patch("/accept-room-reservation/:roomReservationId",acceptRoomReservation)
router.route("/reject-room-reservation/:roomId").patch(jwtAuth,rejectRoomReservation)

module.exports = router;