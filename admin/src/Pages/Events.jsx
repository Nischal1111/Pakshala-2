import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogged } from "../components/Cookie";
import "../css/events.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { notify,Infonotify } from "../components/Notify";
import { ToastContainer } from 'react-toastify';
import { FaTrash } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import {delnotify} from "../components/delnotify"

const Events = () => {
  const [images, setImages] = useState([]);
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [delloading, setdelLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const navigate = useNavigate();
  const [uploading,setUploading]=useState(false)

  const handleOpen = (id) => {
    setOpen(true);
    setImageToDelete(id)
  };

  const handleClose = () => {
    setOpen(false);
    setImageToDelete(null);
  }

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    setUploading(true)
    e.preventDefault();
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append('images', image, `image-${index}`);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-event-images`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setImages([]);
        setLoading(false);
        setUploading(false)
        notify();
        getImages();
      }
    } catch (error) {
      setUploading(false)
      console.error('Error uploading images:', error);
    }
  };

  const getImages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-event-images`, {
        method: 'GET',
        credentials: 'include',
      });

      const data = await response.json();
      if (data.success) {
        setImageList(data.images);
      }
    } catch (error) {
      console.error('Error getting images:', error);
    }
  };

  const handleImageDelete = async () => {
    setdelLoading(true)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-event-image/${imageToDelete}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setdelLoading(false)
        delnotify();
        getImages();
        handleClose();
      }

    } catch (error) {
      setdelLoading(false)
      console.error('Error deleting image:', error);
    }
  }

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className='events-div'>
      <ToastContainer />
      <h1>Events Gallery</h1>
      <form onSubmit={handleSubmit}>
        <div className='images-div'>
          {images.map((image, index) => (
            <div key={index} className="image-container">
              <img src={URL.createObjectURL(image)} alt={`Uploaded ${index}`} className="uploaded-image" />
            </div>
          ))}
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="item-image-file"
            type="file"
            multiple
            onChange={handleImageChange}
          />
          <label htmlFor="item-image-file">
            <Button variant="contained" component="span" style={{ border: "none", backgroundColor: "transparent", color: "blue", boxShadow: "none", textDecoration: "underline" }}>
              Upload Event Image
            </Button>
          </label>
        </div>
        {images.length>0 ? (
          <>
          <Button type="submit" variant="contained" disabled={uploading}
           className='submit-button' style={{ marginLeft: ".5rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor:"orange" }}>
          {uploading ? "Uploading...":"Confirm Upload"}
        </Button>
          </>
        ):(
          <>
          <Button variant="contained"
           className='submit-button disabled-button' style={{ marginLeft: ".5rem", marginTop: "1rem", marginBottom: "1rem", backgroundColor: "lightgray",boxShadow:"none"}}onClick={()=>Infonotify()}>
          Confirm Upload
        </Button>
          </>
        )}
      </form>
      <div className="imageList-div" style={{marginTop:"1rem"}}>
        {imageList.map((item, index) => (
          <div key={index} className="image-container" style={{ position: "relative" }}>
            <img src={item.image_url} alt={`Uploaded ${index}`} className="uploaded-image" />
            <div style={{ backgroundColor: "white", padding: ".4rem", borderRadius: "50%", height: "2rem", width: "2rem" }}
              className='fa-trash-icon2'
              onClick={() => handleOpen(item._id)}
            >
              <FaTrash
                style={{ cursor: "pointer", color: "red" }}
                className='fa-trash-icon2-icon'
              />
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this image?
          </DialogContentText>
        </DialogContent>
        
          {delloading ? (<>
          <div className='loading-spinner' style={{height:"2rem",width:"2rem",margin:"1rem 0rem 2rem 2rem"}}>
            <ImSpinner2 className='loading' style={{height:"2rem",width:"2rem"}}/>
          </div>
          </>):(<>
          <DialogActions>
          <Button onClick={handleClose} color="primary" sx={{ color: "#06D001" }}>
            Cancel
          </Button>
          <Button onClick={handleImageDelete} color="primary" autoFocus sx={{ color: "red" }}>
            Delete
          </Button>
          </DialogActions>
          </>)}
      </Dialog>
    </div>
  );
};

export default Events;
