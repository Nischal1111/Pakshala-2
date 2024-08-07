import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { EventContext } from './EventContext';
import { booknotify } from './Notify';
import { FaTrash } from 'react-icons/fa';

const EventCard = ({ booking }) => {
  const { handleStatusChange, handleDeleteBooking } = useContext(EventContext);
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
    await handleStatusChange(booking._id);
    booknotify();
    handleCloseCompleteDialog();
  };

  const handleConfirmDelete = () => {
    handleDeleteBooking(booking._id);
    handleCloseDeleteDialog();
  };


  return (
    <div style={{ width: "30%" }}>
      <Card
        style={{ marginBottom: '16px' }}
        sx={{
          marginLeft: "1rem",
          textAlign: "center",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          backgroundColor: "rgb(254, 250, 250)",
          boxShadow: "5px 8px rgba(255, 176, 79,0.3)",
          height: "auto",
          color: "black"
        }}
      >
        <CardContent sx={{ color: "black", height: "auto", minHeight: "350px" }}>
          <Typography sx={{ fontSize: "1rem", letterSpacing: "1.5px", marginBottom: ".5rem" }}>Booking Id: {booking._id}</Typography>
          <hr className='order-line' />
          <div style={{ display: "flex", gap: "1rem", flexDirection: "column", width: "100%" }}>
            <Typography variant="subtitle1"
              sx={{
                backgroundColor: "rgb(255, 176, 79,.3)"
                , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".5rem"
              }}>{booking.name}</Typography>
            <Typography variant="subtitle1" sx={{
              backgroundColor: "rgba(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".2rem"
            }}>{booking.contact}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem", marginTop: ".5rem"
            }}>{booking.message}</Typography>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0rem .4rem" }}>
              <Button
                variant="contained"
                onClick={handleOpenCompleteDialog}
                disabled={booking.status === "Completed"}
                sx={{
                  boxShadow: "none",
                  backgroundColor: "rgb(255, 176, 79)",
                  "&:hover": {
                    backgroundColor: "rgb(255, 140,0)",
                    boxShadow: "none",
                  }
                }}
              >
                {booking.status === "Completed" ? "Completed" : "Complete Booking"}
              </Button>
              <FaTrash
                style={{ flex: ".2", color: "red", cursor: "pointer" }}
                onClick={handleOpenDeleteDialog}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog
        open={openCompleteDialog}
        onClose={handleCloseCompleteDialog}
      >
        <DialogTitle>{"Confirm Booking Completion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this booking as completed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCompleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmComplete} color="primary">
            Complete
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
      >
        <DialogTitle>{"Confirm Booking Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this booking?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventCard;
