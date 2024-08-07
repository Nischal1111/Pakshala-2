import React,{useState} from 'react'
import "../Css/About.css"
import { ToastContainer } from 'react-toastify'
import {Dialog,DialogActions,DialogTitle,Button,DialogContent} from "@mui/material"
import QR from "../assets/QR.png"
import ConfirmationModal from './ConfirmationModal'

const ContactForm = () => {
  const[name,setName]=useState("")
  const [contact, setContact] = useState("")
  const [message, setMessage] = useState("")

   const [open, setOpen] = useState(false);
   
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);
   
   const [modalOpen,setModalOpen]=useState(false)
  const handleModalClose=()=>setModalOpen(false)

  const handleNameChange = (event) => setName(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);

    const handleSubmit = async(e) => {
      e.preventDefault()
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/request-order-menu`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName: name, contact: contact, order: message }),
        });
        const data = await response.json();
        if(data.success){
          setModalOpen(true)
          setName("");
          setContact("");
          setMessage("");
        }
        else{
          alert("Order failed")
        }
      } catch (error) {
        
      }   
  };

  
  return (
    <div className='menu-choose2'>
      <ToastContainer/>
      <div className="menu-container-form">
        <h3>Order Here</h3>
        <div className='menu--form'>
            <form onSubmit={handleSubmit}>
                <input className='menu--input' placeholder='Enter your fullname' type='text' autoComplete='off' value={name} required onChange={handleNameChange}/>
                <input className='menu--input' placeholder='Enter your contact number' type='number' autoComplete='off' value={contact} required onChange={handleContactChange}/>
                <textarea name='message' placeholder='Place your order here (menu items)' cols='30'rows='6' autoComplete='off' value={message} required onChange={handleMessageChange}></textarea>
                <div style={{display:"flex",gap:"1rem"}}>
                <button type='submit' className='contact--btn'>Place order</button>
                <button className='contact--btn' type='button' onClick={handleOpen} style={{backgroundColor:"#36C2CE"}}>Scan QR Code</button>
                </div>
            </form>
            <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle>Pay online with Esewa (QR)</DialogTitle>
            <DialogContent>
              <img src={QR} alt="QR" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary" sx={{ color: "var(--hover-color)" }}>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <ConfirmationModal message={"placed your order"} open={modalOpen} handleClose={handleModalClose}/>
    </div>
  )
}

export default ContactForm
