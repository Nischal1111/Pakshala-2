const MenuPdf = require('../Schemas/MenuPdf');

const {uploadFile, uploadFilePdf , deleteFile} = require('../../Utils/UploadFile');


// add file
const addMenuPdf = async (req, res) => {
    try {
        const menuFile = req.files['file'] ? req.files['file'][0] : null;
        const drinkFile = req.files['drink'] ? req.files['drink'][0] : null;

        if (!menuFile || !drinkFile) {
            return res.status(400).json({ success: false, message: 'Both menu and drink files are required.' });
        }

        const menuFilePath = menuFile.path;
        const drinkFilePath = drinkFile.path;

        const menuPdfAvailable = await MenuPdf.find();

        if (menuPdfAvailable.length > 0) {
            await deleteFile(menuPdfAvailable[0].menu_file.menu_public_id);
            await deleteFile(menuPdfAvailable[0].drink_file.menu_public_id);

            const uploadedMenuFile = await uploadFile(menuFilePath, 'menus');
            const uploadedDrinkFile = await uploadFile(drinkFilePath, 'menus');

            menuPdfAvailable[0].menu_file = {
                menu_url: uploadedMenuFile.secure_url,
                menu_public_id: uploadedMenuFile.public_id
            };
            menuPdfAvailable[0].drink_file = {
                menu_url: uploadedDrinkFile.secure_url,
                menu_public_id: uploadedDrinkFile.public_id
            };

            await menuPdfAvailable[0].save();

            res.status(200).json({ success: true, message: 'Menu and drink PDFs updated successfully.' });

        } else {
            const uploadedMenuFile = await uploadFile(menuFilePath, 'menus');
            const uploadedDrinkFile = await uploadFile(drinkFilePath, 'menus');

            const menuPdf = new MenuPdf({
                menu_file: {
                    menu_url: uploadedMenuFile.secure_url,
                    menu_public_id: uploadedMenuFile.public_id
                },
                drink_file: {
                    menu_url: uploadedDrinkFile.secure_url,
                    menu_public_id: uploadedDrinkFile.public_id
                }
            });

            await menuPdf.save();

            res.status(201).json({ success: true, message: 'Menu and drink PDFs added successfully.' });
        }
    } catch (error) {
        console.error('Error adding menu PDF:', error);
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};




// get all menu pdfs

const getMenuPdfs = async (req, res) => {
    try {
        const menuPdfs = await MenuPdf.find();

        if(!menuPdfs){
            return res.status(404).json({success:false, message: 'Menu pdfs not found.' });
        }

        res.status(200).json({success:true, menuPdfs});
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}

// delete menu pdf
const deleteMenuPdf = async (req, res) => {
    try {
        const id = req.params.id;
        const menuPdf = await MenuPdf.findById(id);
       

        if (!menuPdf) {
            return res.status(404).json({success:false, message: 'Menu pdf not found.' });
        }
        

        const delMenu = await deleteFile(menuPdf.menu_file.menu_public_id);
        const delDrink = await deleteFile(menuPdf.drink_file.menu_public_id);
        
        await MenuPdf.findByIdAndDelete(id);

        res.status(200).json({success:true, message: 'Menu pdf deleted successfully.' });
    } catch (error) {
        res.status(500).json({success:false, message: 'Internal server error.' });
    }
}



module.exports = {
    addMenuPdf,
    getMenuPdfs,
    deleteMenuPdf
}