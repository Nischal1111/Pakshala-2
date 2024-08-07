
const Menu = require('../Schemas/Menu');
const uploadFile = require('../../Utils/UploadFile');

//  Adding a new menu item 

const addMenuItem = async (req, res) => {
    try {
        const { title, price, category } = req.body;
        // console.log(title, price, category);
        // console.log(req.file);

        if(!req.file) {
            return res.status(400).json({ message: 'Please upload an image' });
        }
        const imagePath = req.file.path;
        // console.log(imagePath);  
       

        const uploadResult = await uploadFile(imagePath,"menus");

        const newMenuItem =new Menu({
            item_name: title,
            item_price: price,
            item_image: uploadResult.secure_url,
            item_category: category
        });

        await newMenuItem.save();
        
        res.status(201).json({success:true, message: 'Menu item added successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Add menu Item' });
        // console.log(error)
    }
}


// display all the menu items

const getMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        if(!menuItems) {
            return res.status(404).json({ message: 'No menu items found' });
        }
        res.status(200).json({success:true, menuItems});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Get menu Items' });
        // console.log(error)
    }
}



// deleting menu items

const deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await Menu.findByIdAndDelete(id);
        if(!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }
        res.status(200).json({success:true, message: 'Menu item deleted successfully' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error on Delete menu Item' });
        // console.log(error)
    }
}




module.exports = { 
    addMenuItem,
    getMenuItems,
    deleteMenuItem
};