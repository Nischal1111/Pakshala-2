const Room = require('../Schemas/Room');
const {uploadFile , deleteFile} = require('../../Utils/UploadFile');




//adding a new room
// room_name, room_price, room_image1, room_image2, room_image3, room_image4,  room_category

const addRoom = async (req, res) => {
    const { room_name,
        room_old_price,
         room_price,
         room_guests ,
         room_category,
         single_beds,
        double_beds} = req.body;


         console.log(req.body)

        

    // Validate required fields
    if (!room_name || !room_price || !room_category) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if files are provided
    if (!req.files) {
        return res.status(400).json({ message: 'Please upload room images.' });
    }
    // console.log(req.files);

    try {
        // Destructure and validate files
        const { img1, img2, img3, img4 } = req.files;

        if (!img1 || !img2 || !img3 || !img4) {
            return res.status(400).json({ message: 'Please upload all four room images.' });
        }

        
        const img1Path = img1[0].path;
        const img2Path = img2[0].path;
        const img3Path = img3[0].path;
        const img4Path = img4[0].path;

        // Upload images and gather URLs
        const imageUploads = [img1Path, img2Path, img3Path, img4Path].map(path => uploadFile(path, 'rooms'));
        const [uploadedImg1, uploadedImg2, uploadedImg3, uploadedImg4] = await Promise.all(imageUploads);

        // Create new room
        const room = new Room({
            room_name,
            room_price,
            room_guests,
            room_single_beds: single_beds,
            room_double_beds: double_beds,
            room_image1: {
                url: uploadedImg1.secure_url,
                public_id: uploadedImg1.public_id
            },
            room_image2: {
                url: uploadedImg2.secure_url,
                public_id: uploadedImg2.public_id
            },
            room_image3: {
                url: uploadedImg3.secure_url,
                public_id: uploadedImg3.public_id
            },
            room_image4: {
                url: uploadedImg4.secure_url,
                public_id: uploadedImg4.public_id
            },
            room_category
        });

        if(room_old_price) {
            room.room_old_price = room_old_price;
        }

        // Save the room to the database
        await room.save();

        res.status(200).json({ success: true, message: 'Room added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};


// for getting all the rooms

const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find();
        if (!rooms) {
            return res.status(404).json({ message: 'No rooms found.' });
        }

        // Sort rooms based on roomStatus
        const sortedRooms = rooms.sort((a, b) => {
            const statusOrder = ['Available', 'Pending', 'Booked'];
            return statusOrder.indexOf(a.roomStatus) - statusOrder.indexOf(b.roomStatus);
        });

        res.status(200).json({ success: true, rooms: sortedRooms });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}





// for deleting a room
const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const {image1, image2, image3, image4} = req.body;
        // console.log(image1, image2, image3, image4)

        // if(!image1 || !image2 || !image3 || !image4) {
        //     return res.status(400).json({ message: 'Please provide all room images' });
        // }

        // console.log(image1, image2, image3, image4)

        const room = await Room.findByIdAndDelete(id);

        const room1 = room.room_image1.public_id;
        const room2 = room.room_image2.public_id;
        const room3 = room.room_image3.public_id;
        const room4 = room.room_image4.public_id;
        
        const deleteUploads = [room1,room2, room3, room4].map(id => deleteFile(id));   
        const deleteImgs =  await Promise.all(deleteUploads);

        if(!deleteImgs) {
            return res.status(400).json({ message: 'Error deleting room images' });
        }
        
        if(!room) {
            return res.status(404).json({ message: 'Room item not found' });
        }
        res.status(200).json({success:true, message: 'Room item deleted successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Delete table Item' });
        // console.log(error)
    }
}



// editing the room data
const editRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { room_name, room_old_price ,room_price, room_category,room_single_beds,room_double_beds,room_guests } = req.body;
        const files = req.files;

        // console.log(files)

        // Find the room by id
        const room = await Room.findById(id);
        if (!room) {
            return res.status(404).json({ message: 'Room item not found' });
        }

        // Prepare new image paths if provided
        const imagePaths = {
            img1: files.img1 ? files.img1[0].path : null,
            img2: files.img2 ? files.img2[0].path : null,
            img3: files.img3 ? files.img3[0].path : null,
            img4: files.img4 ? files.img4[0].path : null,
        };

        // Prepare old image public IDs
        const oldImageIds = {
            img1: room.room_image1.public_id,
            img2: room.room_image2.public_id,
            img3: room.room_image3.public_id,
            img4: room.room_image4.public_id,
        };

        if (files.img1)
            await deleteFile(oldImageIds.img1);
        if(files.img2)
            await deleteFile(oldImageIds.img2);
        if(files.img3)
            await deleteFile(oldImageIds.img3);
        if(files.img4)
            await deleteFile(oldImageIds.img4);


        // Upload new images and gather URLs
        const imageUploads = Object.keys(imagePaths).map(key => 
            imagePaths[key] ? uploadFile(imagePaths[key], 'rooms') : null
        );
        const uploadedImages = await Promise.all(imageUploads);



        // Update the room data
        room.room_name = room_name;
        room.room_price = room_price;
        room.room_category = room_category;
        room.room_guests=room_guests;
        room.room_single_beds = room_single_beds;
        room.room_double_beds = room_double_beds;
        room.room_old_price = room_old_price;

        // Update room images
        if (uploadedImages[0]) {
            room.room_image1 = {
                url: uploadedImages[0].secure_url,
                public_id: uploadedImages[0].public_id
            };
        }
        if (uploadedImages[1]) {
            room.room_image2 = {
                url: uploadedImages[1].secure_url,
                public_id: uploadedImages[1].public_id
            };
        }
        if (uploadedImages[2]) {
            room.room_image3 = {
                url: uploadedImages[2].secure_url,
                public_id: uploadedImages[2].public_id
            };
        }
        if (uploadedImages[3]) {
            room.room_image4 = {
                url: uploadedImages[3].secure_url,
                public_id: uploadedImages[3].public_id
            };
        }

        // Save the updated room data
        await room.save();

        res.status(200).json({ success: true, message: 'Room item edited successfully' });
    } catch (error) {
        // console.error('Error editing room item:', error); 
        res.status(500).json({ success: false, message: 'Internal server error on Edit room Item' });
    }
};

// for updateing the current status of the ROom >> to make booked room available >> admin manually do this  

const updateStatusOfRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const status = req.body.status;

        let updateStatus;
        if(status === 'Available' || status === 'Booked') {
            updateStatus = await Room.findByIdAndUpdate(roomId, {
                $set: { roomStatus: status }
            }, { new: true });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid status provided.' });
        }

        if (!updateStatus) {
            return res.status(404).json({ success: false, message: 'Room not found.' });
        }

        res.status(200).json({ success: true, message: 'Room status updated successfully.', data: updateStatus });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message || error });
    }
}





module.exports = {
    addRoom,
    getRooms,
    deleteRoom,
    editRoom,
    updateStatusOfRoom
}