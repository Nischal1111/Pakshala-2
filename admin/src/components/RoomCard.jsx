import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { RoomReserveContext } from './RoomReserveContext';
import { booknotify } from './Notify';
import { FaTrash } from 'react-icons/fa';

const RoomCard = ({ reserve }) => {
  const { handleStatusChange,handleDeleteReservation } = useContext(RoomReserveContext);
  const [openCompleteDialog, setOpenCompleteDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleOpenCompleteDialog = () => {
    setOpenCompleteDialog(true);
  };

  const handleCloseCompleteDialog = () => {
    setOpenCompleteDialog(false);
  };

  const handleOpenDeleteDialog = () => {
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirmComplete = async() => {
    await handleStatusChange(reserve._id);
    booknotify();
    handleCloseCompleteDialog();
  };

  const handleDeleteReserve = async () => {
    await handleDeleteReservation(reserve._id)
    handleCloseDeleteDialog();
  };


const [date, time] = reserve.createdAt.split('T');

  return (
    <div style={{ width: "100%",}}>
      <Card
        style={{ marginBottom: '16px'}}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: 'rgb(254, 250, 250)',
          boxShadow: '5px 8px rgba(255, 176, 79,0.3)',
          color: 'white'
        }}
      >
        <CardContent sx={{ display: 'flex', flexDirection: 'column', color: 'black', flex: 1 }}>
          <Typography sx={{ fontSize: '1rem', letterSpacing: '1.5px', marginBottom: '.5rem' }}>Reservation Id: {reserve._id}</Typography>
          <Typography sx={{ fontSize: '1rem', letterSpacing: '1.5px', marginBottom: '.5rem' }}>Date Reserved: {date}</Typography>
          <Typography sx={{ fontSize: '1rem', letterSpacing: '1.5px', marginBottom: '.5rem' }}>Time Reserved: {time.split('.')[0]}</Typography>

          <hr className='order-line' />
          <Typography variant="subtitle1"
            sx={{
              backgroundColor: 'rgb(255, 176, 79,.3)',
              padding: '.5rem 1rem',
              borderRadius: '5px',
              marginTop: '.5rem'
            }}>{reserve.name}</Typography>
          <Typography variant="subtitle1" sx={{
            backgroundColor: 'rgba(255, 176, 79,.3)',
            padding: '.5rem 1rem',
            borderRadius: '5px',
            marginTop: '.2rem'
          }}>{reserve.contact}</Typography>
          <Typography variant="body1" sx={{
            backgroundColor: 'rgb(255, 176, 79,.3)',
            padding: '.5rem 1rem',
            borderRadius: '5px',
            marginBottom: '.2rem',
            marginTop: '.5rem'
          }}>
            Check-In: {new Date(reserve.checkInDate).toLocaleDateString()}<br />
            Check-Out: {new Date(reserve.checkOutDate).toLocaleDateString()}
          </Typography>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0rem .4rem',marginTop:"1rem" }}>
            <Button
              variant="contained"
              onClick={handleOpenCompleteDialog}
              disabled={reserve.status === "Completed"}
              sx={{
                boxShadow: 'none',
                backgroundColor: 'rgb(255, 176, 79)',
                "&:hover": {
                  backgroundColor: 'rgb(255, 140,0)',
                  boxShadow: 'none',
                }
              }}
            >
              {reserve.status === "Completed" ? "Completed" : "Book Room"}
            </Button>
            <FaTrash
              style={{ flex: ".2", color: "red", cursor: "pointer" }}
              onClick={handleOpenDeleteDialog}
            />
          </div>
        </CardContent>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1,color:"black" }}>
          <Typography variant="h5" sx={{fontSize:"1.8rem",letterSpacing:"2px"}}>{reserve.roomId.room_name}</Typography>
          <img src={reserve.roomId.room_image1.url} alt="room" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
          <div style={{display:"flex",justifyContent:"space-between",marginTop:".5rem",gap:"3rem"}}>
          <Typography variant="h6">Price: ${reserve.roomId.room_price} per night</Typography>
          <Typography variant="h6">Guests: {reserve.roomId.room_guests}</Typography>
          <Typography variant="h6">Single Beds: {reserve.roomId.room_single_beds}</Typography>
          <Typography variant="h6">Double Beds: {reserve.roomId.room_double_beds}</Typography>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={openCompleteDialog}
        onClose={handleCloseCompleteDialog}
      >
        <DialogTitle>{"Confirm Room Booking"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to book this room?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmComplete} color="primary">
            Book
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>{"Confirm Reservation Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this reservation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeleteReserve} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RoomCard;
