import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {motion} from "framer-motion"
import {fadeIn} from "../motion/motion.js"

function ConfirmationModal({ open, handleClose,message }) {
  return (
    <motion.div variants={fadeIn('up', 'tween', .2, .7) }>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation-dialog-title"
        aria-describedby="confirmation-dialog-description"
      >
        <DialogTitle id="confirmation-dialog-title">Booking Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirmation-dialog-description">
            Successfully {message}. You will receive a call shortly for confirmation. <br /> Thank You !!!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{backgroundColor:"var(--primary-color)",color:"white"}}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </motion.div>
  );
}

export default ConfirmationModal;
