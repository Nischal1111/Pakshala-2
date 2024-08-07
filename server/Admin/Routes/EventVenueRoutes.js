const router = require('express').Router();

const jwtAuth = require('../Middleware/authMiddleware');


const {
   addBookVenue,
    getBookVenues,
    acceptEventBooking,
    rejectEventBooking
} = require('../Controllers/EventVenueControl');




//routes for event reservation

router.post('/request-event-venue', addBookVenue);


router.get('/get-event-venues',jwtAuth ,getBookVenues);

router.patch("/accept-event-booking/:id",acceptEventBooking);

router.patch("/reject-event-booking/:id",rejectEventBooking);

module.exports = router;



