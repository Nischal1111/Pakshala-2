const express = require('express');
const router = express.Router();
const jwtAuth = require('../Middleware/authMiddleware');

const {
    createMenuRequest,
    getAllMenuOrders,
    acceptMenuOrders,
    rejectMenuOrders,
    deleteMenuOrder
} = require('../Controllers/MenuOrderControl');


//middleware
// router.use(jwtAuth);


//routes
//create menu order request
router.post('/request-order-menu', createMenuRequest);

//get all menu orders
router.get('/get-all-menu-orders', getAllMenuOrders);

// accept the order menu
router.route("/accept-order-menu" ).patch(acceptMenuOrders)

// reject menu orders
router.route("/reject-order-menu").patch(rejectMenuOrders)

// delete menu orders
router.route('/delete-order-menu/:id').delete( deleteMenuOrder)

module.exports = router;


