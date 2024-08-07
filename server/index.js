// Mon Jun 10 8:49 PM 2024 (Saurav Karki)

const express = require('express');
const app = express();

const connectDB = require('./Database/ConnectDB');
connectDB();
const cors = require('cors');
require('dotenv').config()

const cookieParser = require('cookie-parser');



port = process.env.PORT

//routes
const adminRoutes = require('./Admin/Routes/AdminRoutes');
const menuRoutes = require('./Admin/Routes/MenuRoutes');
const tableRoutes = require('./Admin/Routes/TableRoutes');
const roomRoutes = require('./Admin/Routes/RoomRoutes');
const SpecialMenuRoutes = require('./Admin/Routes/SpecialMenuRoutes');
const MenuPdfRoutes = require('./Admin/Routes/MenuPdfRoutes');
const offerRoutes = require('./Admin/Routes/OfferRoutes');
const eventImageRoutes = require('./Admin/Routes/EventImageRoutes');
const MenuOrderRoutes = require('./Admin/Routes/MenuOrderRoutes');
const RoomReserveRoutes = require('./Admin/Routes/RoomReserveRoutes');
const TableReserveRoutes = require('./Admin/Routes/TableReserveRoutes');
const EventVenueRoutes = require('./Admin/Routes/EventVenueRoutes');



//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001' ],
    credentials: true,
}));
app.use(cookieParser());

//routes
app.use('/admin', 
    adminRoutes, 
    menuRoutes, 
    tableRoutes,
    roomRoutes,
    SpecialMenuRoutes,
    MenuPdfRoutes,
    offerRoutes,
    eventImageRoutes,
    MenuOrderRoutes,
    RoomReserveRoutes,
    TableReserveRoutes,
    EventVenueRoutes
);



app.get('/', (req, res) => {
    res.send('Hello Pakshala.');
}
);




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});