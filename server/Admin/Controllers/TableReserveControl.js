
const TableReserve = require('../Schemas/TableReserve');
const Table = require('../Schemas/Table');
const { sendTableBookingMail } = require('../../Utils/MailSend');


// Add a new table reservation

const addTableReserve = async (req, res) => {
    try {
        const tableId = req.params.id;
        const { name, contact, email, date, time, guests } = req.body;

        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found' });
        }

        const reserveTable = new TableReserve({
            name,
            contact,
            email,
            reserveDate:date,
            reserveTime : time,
            guestsNumber : guests,
            tableId
        });

        const reserve = await reserveTable.save();

        const tablereserveStatus = await Table.findByIdAndUpdate(tableId,{
            tableStatus:"Pending"
        })

        if (!reserve || !tablereserveStatus) {
            return res.status(400).json({ success: false, message: 'Table reservation failed' });
        }
        await sendTableBookingMail({ bookingDetails: reserve });

        res.status(201).json({ success: true, message: 'Table reserved successfully', reserve });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Add table reservation', error: error });
    }
}


// Get all the table reservations

const getTableReserves = async (req, res) => {
    try {
        const reserves = await TableReserve.find({}).populate('tableId');
        if (reserves.length === 0) {
            return res.status(404).json({ message: 'No table reservations found' });
        }
        res.status(200).json({ success: true, reserves });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get table reservations', error });
    }
}

const acceptTableReservation = async (req, res) => {
  try {
    const tableReservationId = req.params.id;

    const acceptTable = await TableReserve.findByIdAndUpdate(
      tableReservationId,
      { status: "Completed" },
      { new: true }
    );

    if (!acceptTable) {
      return res.status(404).json({ success: false, message: "Table reservation not found" });
    }

    const tableId = acceptTable.tableId;
    const updateTableStatus = await Table.findByIdAndUpdate(
        tableId,
        { tableStatus: "Booked" },
        { new: true }
        );
    if (!updateTableStatus) {
        return res.status(404).json({ success: false, message: "Table not found" });
    }

    res.status(200).json({ success: true, message: "Table reservation accepted", data: acceptTable });
  } catch (error) {
    res.status(400).json({ success: false, message: "Error accepting table reservation", error });
  }
};


const rejectTableReservation = async(req,res)=>{
    try {
        const tableReservationId = req.params.id;

        const rejectTable = await TableReserve.findByIdAndUpdate(tableReservationId,{
            status: "Declined"
        },{
            new: true
        })

        const tableId = rejectTable.tableId;
        const updateTableStatus = await Table.findByIdAndUpdate(
            tableId,
            { tableStatus: "Available" },
            { new: true }
            );

        if(!rejectTable || !updateTableStatus){
            return res.status(404).json({success:false, message: "Failed to update table reservation status"})
        }

        res.status(200).json({success:true, message: "Table reservation rejected" })
    } catch (error) {
        res.status(400).json({success:false,message:"error",error})
    }
}






module.exports = {
    addTableReserve,
    getTableReserves,
    acceptTableReservation,
    rejectTableReservation
}