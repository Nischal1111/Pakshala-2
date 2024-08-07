const RoomReserve = require('../Schemas/RoomReserve');
const Room = require('../Schemas/Room');
const { sendRoomBookingMail } = require('../../Utils/MailSend');



// Add a new room reservation

const addRoomReserve = async (req, res) => {
    try {
        const roomId = req.params.id;
        const { name, contact, checkInDate, checkOutDate } = req.body;

        const room = await Room.findById(roomId);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const reserveRoom = new RoomReserve({
            name,
            contact,
            checkInDate,
            checkOutDate,
            roomId
        });

        

        const reserve = await reserveRoom.save();

        const updateRoomStatus = await Room.findByIdAndUpdate(roomId,{
                roomStatus: "Pending"
            })

        if (!reserve || !updateRoomStatus) {
            return res.status(400).json({ success: false, message: 'Room reservation failed' });
        }

        await sendRoomBookingMail({ bookingDetails: reserve });

        res.status(201).json({ success: true, message: 'Room reserved successfully', reserve });

        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Add room reservation', error: error });     
    }
}



// Get all the room reservations

const getRoomReserves = async (req, res) => {
    try {
        const reserves = await RoomReserve.find().populate('roomId');
        if (!reserves) {
            return res.status(404).json({ message: 'No room reservations found' });
        }
        res.status(200).json({ success: true, reserves });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get room reservations', error: error });
    }
}

const acceptRoomReservation = async (req, res) => {
  try {
    const roomReservationId = req.params.roomReservationId;

    const acceptRoom = await RoomReserve.findByIdAndUpdate(
      roomReservationId,
      { status: "Completed" },
      { new: true }
    );

 

    const roomId = acceptRoom.roomId;
    const room = await Room.findByIdAndUpdate(
        roomId,
        { roomStatus: "Booked" },
        { new: true }
    );

    if (!acceptRoom || !room) {
        return res.status(404).json({ success: false, message: "Failed to accpet reservation" });
    }

    res.status(200).json({ success: true, message: "Room reservation accepted", data: acceptRoom });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error accepting room reservation", error });
  }
};


const rejectRoomReservation = async(req, res) => {
    try {
        const roomReservationId = req.params.roomId

        const rejectRoom = await RoomReserve.findByIdAndUpdate(roomReservationId, {
            status: "Rejected"
        }, {
            new: true
        });

     
        const roomId = rejectRoom.roomId;

        const room = await Room.findByIdAndUpdate(
            roomId,
            { roomStatus: "Available" },
            { new: true }
        );

       

        if (!rejectRoom|| !room) {
            return res.status(404).json({ success: false, message: "Failed to update room status." });
        }

        res.status(200).json({ success: true, message: "Room reservation rejected" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ success: false, message: "error", error });
    }
};





module.exports = {
    addRoomReserve,
    getRoomReserves,
    acceptRoomReservation,
    rejectRoomReservation
}