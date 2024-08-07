const MenuOrder = require('../Schemas/MenuOrder');
const {sendMenuOrderMail} = require('../../Utils/MailSend')



// requesting new menu order

const createMenuRequest = async (req, res) => {
    try {
        const { fullName, contact, order } = req.body;

        if (!fullName || !contact || !order) {
            return res.status(400).json({success:false, message: "All fields are required" });
        }

        const newMenuOrder = new MenuOrder({
            fullName,
            contact,
            order
        });
        const savedMenuOrder = await newMenuOrder.save();
        if (!savedMenuOrder) {
            return res.status(500).json({success:false, message: "Menu order request failed" });
        }
        //sending mail
        await sendMenuOrderMail({orderDetails: savedMenuOrder})

        res.status(200).json({success:true, order:savedMenuOrder ,message: "Menu order request sent successfully" });
    } catch (err) {
        res.status(500).json({success:false, error: err.message, message: "Menu order request failed" });
    }
}

// displaying all menu orders
const getAllMenuOrders = async (req, res) => {
    try {
        const allMenuOrders = await MenuOrder.find();
        if (!allMenuOrders) {
            return res.status(404).json({success:false, message: "Menu orders not found" });
        }
        res.status(200).json({success:true, orders: allMenuOrders });
    } catch (err) {
        res.status(500).json({success:false, error: err.message, message: "Menu orders not found" });
    }
}

const acceptMenuOrders = async (req, res) => {
  try {
    const { orderId } = req.body;

    const acceptMenu = await MenuOrder.findByIdAndUpdate(orderId, {
      status: "Completed"
    }, {
      new: true
    });

    if (!acceptMenu) {
      return res.status(404).json({ success: false, message: "Menu order not found" });
    }

    res.status(200).json({ success: true, message: "Menu order accepted", order: acceptMenu });
  } catch (error) {
    res.status(400).json({ success: false, message: "error", error });
  }
};



const rejectMenuOrders = async(req,res)=>{
    try {
        const {orderId} = req.body;

        const rejectOrder = await MenuOrder.findByIdAndUpdate(orderId,{
            status: "Rejected"
        },{
            new: true
        })

        if(!rejectOrder){
            return res.status(404).json({success:false, message: "Menu order not found"})
        }

        res.status(200).json({success:true,message:"Menu order rejected"})

    } catch (error) {
        res.status(400).json({success:false, message:"error", error})
    }
}


//for deleting menu orders
const deleteMenuOrder = async (req, res) => {
    try {
        const orderId = req.params.id;

        const deleteOrder = MenuOrder.findByIdAndDelete(orderId);

        if (!deleteOrder) {
            return res.status(404).json({ success: false, message: "Menu order not found" });
        }

        res.status(200).json({ success: true, message: "Menu order deleted" });

    } catch (error) {
        res.status(400).json({ success: false, message: "error", error })
    }
}


module.exports = {
    createMenuRequest,
    getAllMenuOrders,
    acceptMenuOrders,
    rejectMenuOrders,
    deleteMenuOrder
}


