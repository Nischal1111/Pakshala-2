import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Box, TextField, Button } from '@mui/material';
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Edit, Delete,Close,Check} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { userLogged } from "../components/Cookie";
import { ToastContainer } from "react-toastify";
import { notify,RoomCancelnotify,Roomnotify } from "../components/Notify";
import { delnotify } from "../components/delnotify";
import { editnotify } from '../components/editnotify';
import { ImSpinner2 } from "react-icons/im";


// api for status of table
// method = patch
  //available-status/:tableId  
  // for booked status table
//"booked-status/:tableId (method=patch)
//"maile feri push garrey hai"
const Tables = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLogged()) {
      navigate('/login');
    }
  }, [navigate]);

  const [tableData, setTableData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newTable, setNewTable] = useState({ title: '', category: '', guests: '', img: null });
  const [errors, setErrors] = useState({ title: false, category: false, guests: false, img: false });
  const [imagePreview, setImagePreview] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTableData, setEditTableData] = useState({ title: '', category: '', guests: '', img: null });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);
  const [delloading, setdelLoading] = useState(false);
  const [delopen, setDelOpen] = useState(false);

  const handleDelOpen = (id) => {
    setDelOpen(true);
  };

  const handleDelClose = () => {
    setDelOpen(false);
  }
  const getAllTableItems = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/get-table-items`, {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setTableData(data.tableItems);
      }
    } catch (error) {
      console.error('Error fetching table items:', error);
    }
  };

  useEffect(() => {
    getAllTableItems();
  }, []);

  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
    setEditModalOpen(false);
    setNewTable({ title: '', category: '', guests: '', img: null });
    setEditTableData({ title: '', category: '', guests: '', img: null });
    setImagePreview(null);
    setEditImagePreview(null);
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (editModalOpen) {
      if (name === 'img') {
        setEditTableData({ ...editTableData, img: files[0] });
        setEditImagePreview(URL.createObjectURL(files[0]));
      } else {
        setEditTableData({ ...editTableData, [name]: value });
      }
    } else {
      if (name === 'img') {
        setNewTable({ ...newTable, img: files[0] });
        setImagePreview(URL.createObjectURL(files[0]));
        setErrors({ ...errors, img: false });
      } else {
        setNewTable({ ...newTable, [name]: value });
        setErrors({ ...errors, [name]: false });
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    const newErrors = {
      title: newTable.title.trim() === '',
      category: newTable.category.trim() === '',
      guests: newTable.guests.trim() === '',
      img: newTable.img === null
    };

    if (Object.values(newErrors).some(error => error)) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', newTable.title);
    formData.append('category', newTable.category);
    formData.append('guest', newTable.guests);
    formData.append('img', newTable.img);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/add-table-item`, {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      const data = await response.json();
      if (data.success) {
        notify();
        setLoading(false);
        getAllTableItems();
      } else {
        setLoading(false)
        console.error('Error adding table item:', data.error);
      }
    } catch (error) {
      setLoading(false)
      console.error('Error adding table item:', error);
    }

    handleClose();
  };

  const handleEdit = (id) => {
    const tableToEdit = tableData.find(item => item._id === id);
    const index = tableData.findIndex(item => item._id === id);
    setEditTableData({
      title: tableToEdit.table_name,
      category: tableToEdit.table_category,
      guests: tableToEdit.table_guests,
      img: null,
      _id: tableToEdit._id,
      table_image: tableToEdit.table_image
    });
    setEditImagePreview(tableToEdit.table_image.url || null);
    setEditingIndex(index + 1);
    setEditModalOpen(true);
  };

  const handleEditSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('name', editTableData.title);
    formData.append('category', editTableData.category);
    formData.append('guest', editTableData.guests);
    if (editTableData.img) {
      formData.append('img', editTableData.img);
    }
    formData.append('oldImgId', editTableData.table_image.public_id);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/edit-table-item/${editTableData._id}`, {
        method: 'PATCH',
        credentials: 'include',
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        editnotify();
        setLoading(false);
        getAllTableItems();
        handleClose();
      } else {
        setLoading(false);
        console.error('Error editing table item:', data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error editing table item:', error);
    }
  };

  const handleDelete = async (id) => {
    setdelLoading(true)
    const itemToDelete = tableData.find(item => item._id === id);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/delete-table-item/${id}`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ imageId: itemToDelete.table_image.public_id })
        });

        const data = await response.json();
        if (data.success) {
          setdelLoading(false)
          handleDelClose()
          delnotify();
          setTableData(tableData.filter(item => item._id !== id));
        } else {
          setdelLoading(false)
          console.error('Error deleting table item:', data.error);
        }
      } catch (error) {
        console.error('Error deleting table item:', error);
    }
  };

  const handleChangeBookingStatus = async (id, status) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/update-status-table/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        if(status==="Available"){
          RoomCancelnotify()
        }else{
          Roomnotify()
        }
        setTableData(prevTableData => 
          prevTableData.map(table => table._id === id ? { ...table, tableStatus: status } : table)
        );
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error updating table status:", error);
    }
  };

  return (
    <>
      <div className="menu-content">
        <ToastContainer />
        <button onClick={handleOpen} className='add-item'>Add Table</button>
        <div className='menu-table'>
          <TableContainer component={Paper}>
            <Table>
              <TableHead className='table-head'>
                <TableRow>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>SN</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Image</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Name</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Category</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Status</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Guests</TableCell>
                  <TableCell style={{ fontSize: "1.2rem", letterSpacing: "1px", fontWeight: "500" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item, index) => (
                  <>
                  <TableRow key={item._id} className='table-row'>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell className='table-row'>
                      {item.table_image ? <img src={item.table_image.url} alt={item.table_name} className="menu-img" /> : 'No Image'}
                    </TableCell>
                    <TableCell className='table-row'>{item.table_name}</TableCell>
                    <TableCell className='table-row'>{item.table_category}</TableCell>
                    <TableCell className='table-row'>{item.tableStatus === "Booked" ? (
                      <IconButton onClick={() => handleChangeBookingStatus(item._id, 'Available')}>
                        <Close className='menu-delete' />
                      </IconButton>
                    ) : (
                      <IconButton onClick={() => handleChangeBookingStatus(item._id, 'Booked')}>
                        <Check className='menu-edit' />
                      </IconButton>
                    )}</TableCell>
                    <TableCell className='table-row'>{item.table_guests}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(item._id)}>
                        <Edit className='menu-edit' />
                      </IconButton>
                      <IconButton onClick={handleDelOpen}>
                        <Delete className='menu-delete' />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <Dialog
        open={delopen}
        onClose={handleDelClose}
        PaperProps={{
    style: {
      backgroundColor: 'white',
      boxShadow: 'none', 
    },
  }}
      >
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this room?
          </DialogContentText>
        </DialogContent>
        
          {delloading ? (<>
          <div className='loading-spinner' style={{height:"2rem",width:"2rem",margin:"1rem 0rem 2rem 2rem"}}>
            <ImSpinner2 className='loading' style={{height:"2rem",width:"2rem"}}/>
          </div>
          </>):(<>
          <DialogActions>
          <Button onClick={handleDelClose} color="primary" sx={{ color: "#06D001" }}>
            Cancel
          </Button>
          <Button onClick={()=>handleDelete(item._id)} color="primary" autoFocus sx={{ color: "red" }}>
            Delete
          </Button>
          </DialogActions>
          </>)}
      </Dialog>
                  </>
                  
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <Modal open={open} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Add New Table</h2>
          <form>
            <TextField
              label="Name"
              name="title"
              value={newTable.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.title}
              helperText={errors.title ? "Name is required" : ""}
            />
            <TextField
              label="Category"
              name="category"
              value={newTable.category.toLowerCase()}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.category}
              helperText={errors.category ? "Category is required" : ""}
            />
            <TextField
              label="Guests"
              name="guests"
              type="number"
              value={newTable.guests}
              onChange={handleChange}
              fullWidth
              margin="normal"
              error={errors.guests}
              helperText={errors.guests ? "Number of guests is required" : ""}
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Image
              </Button>
            </label>
            {imagePreview && <img src={imagePreview} alt="Preview" className="image-preview" />}
            {errors.img && <p style={{ color: 'red' }}>Image is required</p>}
            {loading ? (
              <div className='loading-spinner'>
                <ImSpinner2 className='loading' />
              </div>
            ) : (
              <Box display="flex" justifyContent="space-between" marginTop="16px">
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                  Add
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClose} style={{ backgroundColor: 'red' }}>
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Modal>
      <Modal open={editModalOpen} onClose={handleClose}>
        <Box className="modal-box" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
          <h2 style={{ textAlign: "center" }}>Editing table number {editingIndex}</h2>
          <form>
            <TextField
              label="Name"
              name="title"
              value={editTableData.title}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Category"
              name="category"
              value={editTableData.category.toLowerCase()}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Guests"
              name="guests"
              type="number"
              value={editTableData.guests}
              onChange={handleChange}
              fullWidth
              margin="normal"
            />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file-edit"
              type="file"
              name="img"
              onChange={handleChange}
            />
            <label htmlFor="raised-button-file-edit">
              <Button variant="contained" component="span" className='upload-img'>
                Upload Image
              </Button>
            </label>
            {editImagePreview && <img src={editImagePreview} alt="Preview" className="image-preview" />}
            {loading ? (
              <div className='loading-spinner'>
                <ImSpinner2 className='loading' />
              </div>
            ) : (
              <Box display="flex" justifyContent="space-between" marginTop="16px">
                <Button variant="contained" color="primary" onClick={handleEditSubmit}>
                  Update
                </Button>
                <Button variant="contained" color="secondary" onClick={handleClose}>
                  Cancel
                </Button>
              </Box>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default Tables
