
const Table = require('../Schemas/Table');
const {uploadFile, deleteFile} = require('../../Utils/UploadFile');

//  Adding a new table item 

const addTableItem = async (req, res) => {
    try {
        const { name, category, guest } = req.body;
        // console.log(title, price, category);
        // console.log(req.file);

        if(!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const imagePath = req.file.path;
        // console.log(imagePath);  
       

        const uploadResult = await uploadFile(imagePath,"tables");

        const newMenuItem =new Table({
            table_name: name,
            table_guests: guest,
            table_image: {
                url: uploadResult.secure_url,
                public_id: uploadResult.public_id      
            },
            table_category: category
        });

        await newMenuItem.save();
        
        res.status(201).json({success:true, message: 'table item added successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Add table Item' });
        // console.log(error)
    }
}


// display all the table items

const getTableItems = async (req, res) => {
    try {
        const tableItems = await Table.find();
        if (!tableItems) {
            return res.status(404).json({ message: 'No table items found' });
        }

        // Sorting tableItems based on tableStatus
        const sortedTableItems = tableItems.sort((a, b) => {
            const statusOrder = ['Available', 'Pending', 'Booked'];
            return statusOrder.indexOf(a.tableStatus) - statusOrder.indexOf(b.tableStatus);
        });

        res.status(200).json({ success: true, tableItems: sortedTableItems });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error on Get table Items' });
        console.log(error);
    }
}




// deleting table items

const deleteTableItem = async (req, res) => {
    try {
        const { id } = req.params;
        const {imageId} = req.body;

        // console.log(id, imageId);

        if(!id) {
            return res.status(400).json({ message: 'Please provide table id' });
        }

        if(!imageId) {
            return res.status(400).json({ message: 'Please provide image id' });
        }

        const tableItem = await Table.findByIdAndDelete(id);

        
        const deleteImage = await deleteFile(imageId);
        if(!deleteImage) {
            return res.status(400).json({ message: 'Error deleting table image' });
        }

        if(!tableItem) {
            return res.status(404).json({ message: 'table item not found' });
        }
        res.status(200).json({success:true, message: 'table item deleted successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Delete table Item' });
        // console.log(error)
    }
}


// editing the table data

const editTableItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, category, guest, oldImgId } = req.body;

        if (!id) {
            return res.status(400).json({ message: 'Please provide table id' });
        }
       

        const imagePath = req?.file?.path;


        const tableItem = await Table.findById(id);
        if (!tableItem) {
            return res.status(404).json({ message: 'Table item not found' });
        }

      if(imagePath) {
          // Upload new image and delete old image in parallel
          const [uploadNewImage, deleteOldImage] = await Promise.all([
            uploadFile(imagePath, "tables"),
            deleteFile(oldImgId)
        ]);

        if (!uploadNewImage) {
            return res.status(400).json({ message: 'Error uploading table image' });
        }

        if (!deleteOldImage) {
            return res.status(400).json({ message: 'Error deleting old table image' });
        }

        tableItem.table_name = name;
        tableItem.table_category = category;
        tableItem.table_guests = guest;
        tableItem.table_image = {
            url: uploadNewImage.secure_url,
            public_id: uploadNewImage.public_id
        };

        await tableItem.save();
    }else{
        tableItem.table_name = name;
        tableItem.table_category = category;
        tableItem.table_guests = guest;
    
        await tableItem.save();
    }

        res.status(200).json({ success: true, message: 'Table item updated successfully' });
    } catch (error) {
        console.error('Error editing table item:', error); // Log the error for debugging
        res.status(500).json({ success: false, message: 'Internal server error on Edit table Item' });
    }
};



// for updateing the current status of the table >> to make booked table available >> admin manually do this  

const updateStatusOfTable = async (req, res) => {
    try {
        const tableId = req.params.tableId;
        const { status } = req.body;

        let updateStatus;
        if (status === 'Available' || status === 'Booked') {
            updateStatus = await Table.findByIdAndUpdate(
                tableId,
                {
                    $set: {
                        tableStatus: status,
                    }
                },
                { new: true }
            );
        } else {
            return res.status(400).json({ success: false, message: 'Invalid status provided.' });
        }

        if (!updateStatus) {
            return res.status(404).json({ success: false, message: 'Table not found.' });
        }

        res.status(200).json({ success: true, message: 'Table status updated successfully.', data: updateStatus });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, error: error.message || error });
    }
};








module.exports = { 
    addTableItem,
    getTableItems,
    deleteTableItem,
    editTableItem,
    updateStatusOfTable
};