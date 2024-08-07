import React, { useContext, useState } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { TableReserveContext } from './TableContext';
import { booknotify } from './Notify';
import { FaTrash } from 'react-icons/fa';

const TableReserveCard = ({ reservation }) => {
  const { handleStatusChange, handleDeleteReservation } = useContext(TableReserveContext);
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

  const handleConfirmComplete = async () => {
    await handleStatusChange(reservation._id);
    booknotify();
    handleCloseCompleteDialog();
  };

  const handleConfirmDelete = () => {
    handleDeleteReservation(reservation._id);
    handleCloseDeleteDialog();
  };

  


  console.log(reservation.createdAt)

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
          color: "white"
        }}
      >
        <CardContent sx={{ color: "black", height: "auto" }}>
          <Typography sx={{ fontSize: "1rem", letterSpacing: "1.5px", marginBottom: ".5rem" }}>Reservation Id: {reservation._id}</Typography>
          <hr className='order-line' />
          <div style={{ display: "flex", gap: "1rem", flexDirection: "column", width: "100%" }}>
            <Typography variant="subtitle1"
              sx={{
                backgroundColor: "rgb(255, 176, 79,.3)"
                , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".5rem"
              }}>{reservation.name}</Typography>
            <Typography variant="subtitle1" sx={{
              backgroundColor: "rgba(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginTop: ".2rem"
            }}>{reservation.contact}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem", marginTop: ".5rem"
            }}>Reserved Table: {reservation.tableId.table_name}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem"
            }}>Guests: {reservation.guestsNumber}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem"
            }}>Date: {reservation.reserveDate.split("T")[0]}</Typography>
            <Typography variant="body1" sx={{
              backgroundColor: "rgb(255, 176, 79,.3)"
              , padding: ".5rem 1rem", borderRadius: "5px", marginBottom: ".2rem"
            }}>Time: {reservation.reserveTime}</Typography>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0rem .4rem" }}>
              <Button
                variant="contained"
                onClick={handleOpenCompleteDialog}
                disabled={reservation.status === "Completed"}
                sx={{
                  boxShadow: "none",
                  backgroundColor: "rgb(255, 176, 79)",
                  "&:hover": {
                    backgroundColor: "rgb(255, 140,0)",
                    boxShadow: "none",
                  }
                }}
              >
                {reservation.status === "Completed" ? "Completed" : "Complete Reservation"}
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
        <DialogTitle>{"Confirm Reservation Completion"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this reservation as completed?
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
          <Button onClick={handleConfirmDelete} color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableReserveCard;
