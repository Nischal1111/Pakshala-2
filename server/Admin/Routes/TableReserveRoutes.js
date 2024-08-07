const router = require('express').Router();

const jwtAuth = require('../Middleware/authMiddleware');

const {
    addTableReserve,
    getTableReserves,
    acceptTableReservation,
    rejectTableReservation
} = require('../Controllers/TableReserveControl');




//routes
router.post('/request-table-reserve/:id', addTableReserve);


router.get('/get-table-reserves', jwtAuth, getTableReserves);

router.patch("/accept-table-reservation/:id",acceptTableReservation)
router.route("/reject-table-reservation/:id").patch(jwtAuth,rejectTableReservation)

module.exports = router;