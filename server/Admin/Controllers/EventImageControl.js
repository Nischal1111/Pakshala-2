const EventImage = require('../Schemas/EventImage');

const {uploadFile, deleteFile} = require('../../Utils/UploadFile')




// add image to event
const addImages = async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ msg: 'No images provided' });
        }

        const images = req.files;
        const uploadResults = [];

        for (const image of images) {
            // Upload image to Cloudinary
            const result = await uploadFile(image.path, "Event_Image");

            // Adding image to database
            const newImage = new EventImage({
                image_url: result.secure_url,
                image_public_id: result.public_id
            });

            const savedImage = await newImage.save();
            if (savedImage) {
                uploadResults.push(savedImage);
            }
        }

        if (uploadResults.length === 0) {
            return res.status(500).json({ msg: 'Failed to add images' });
        }

        return res.status(200).json({
            success: true,
            message: 'Images added successfully',
            images: uploadResults
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};






// delete image from event
const deleteImage = async (req, res) => {
    try {
        const id = req.params.id;

        const image = await EventImage.findById(id);
        if (!image) {
            return res.status(404).json({success:false, message: 'Image not found' });
        }

        // Delete image from Cloudinary
        const deleteImg = await deleteFile(image.image_public_id);
        if (!deleteImg) {
            return res.status(200).json({success:false, message: 'Error while deleting image.' });
        }

        // Delete image from database
        const removeImage = await EventImage.findByIdAndDelete(id);
        if (!removeImage) {
            return res.status(500).json({success:false, message: 'Failed to delete image' });
        }

        return res.status(200).json({success:true, message: 'Image deleted successfully' });

    } catch (err) {
        return res.status(500).json({success:false, message: 'Internal server error', error:err});
    }
}


// get images
const getImages = async (req, res) => {
    try {
        const images = await EventImage.find();
        if (!images) {
            return res.status(404).json({success:false, message: 'No images found' });
        }

        return res.status(200).json({success:true, message: 'Images', images });

    } catch (err) {
        console.log(err);
        return res.status(500).json({success:false, message: 'Internal server error' });
    }
}
        








module.exports = {
    addImages,
    deleteImage,
    getImages
}
