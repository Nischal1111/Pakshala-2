const express = require('express')
const offerRouter = express.Router()
const { 
    addOffer, 
    getOffers, 
    deleteOffer 
} = require('../Controllers/OfferControl')

const jwtAuth = require('../Middleware/authMiddleware')
const multer = require('multer')

const uploader = multer({
    storage: multer.diskStorage({})
})

//middleware

// offerRouter.use(jwtAuth)


// Add a new offer
offerRouter.post('/add-offer', uploader.single('img'),jwtAuth, addOffer)

// Getting new offer
offerRouter.get('/get-offers', getOffers)


// Deleting an offer
offerRouter.delete('/delete-offer/:id',jwtAuth, deleteOffer)


module.exports = offerRouter
