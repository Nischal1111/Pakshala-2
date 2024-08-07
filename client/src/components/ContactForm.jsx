import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "../Css/About.css"
import {contactnotify} from "./Notify"
import { ToastContainer } from 'react-toastify';
import ConfirmationModal from './ConfirmationModal';

const ContactForm = () => {
  const { hash } = useLocation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");

  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleContactChange = (event) => setContact(event.target.value);
  const handleMessageChange = (event) => setMessage(event.target.value);

  const [modalOpen,setModalOpen]=useState(false)
  const handleModalClose=()=>setModalOpen(false)

  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(name, email, contact, message);

    try {
      const  response = await fetch(`${process.env.REACT_APP_API_URL}/request-event-venue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, contact, message }),
      });

      const data = await response.json();
      if (data.success) {
        setModalOpen(true)
        setName("");
        setEmail("");
        setContact("");
        setMessage("");
      } else {
        alert('Message failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
    }

   
  };

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

  return (
    <div className='about-choose2' id='bookvenue'>
      <ToastContainer/>
      <div className="contact-container-form">
        <h3>Send us Message</h3>
        <div className='contact--form'>
          <form onSubmit={handleSubmit}>
            <input
              className='contact--input'
              placeholder='Enter your Fullname'
              type='text'
              autoComplete='off'
              required
              value={name}
              onChange={handleNameChange}
            />
            <input
              className='contact--input'
              placeholder='Enter your E-mail'
              type='email'
              autoComplete='off'
              required
              value={email}
              onChange={handleEmailChange}
            />
            <input
              className='menu--input'
              placeholder='Enter your contact number'
              type='number'
              autoComplete='off'
              required
              value={contact}
              onChange={handleContactChange}
            />
            <textarea
              name='message'
              placeholder='Enter your message'
              cols='30'
              rows='6'
              autoComplete='off'
              required
              value={message}
              onChange={handleMessageChange}
            ></textarea>
            <button type="submit" className='contact--btn'>Send</button>
          </form>
        </div>
      </div>
      <ConfirmationModal open={modalOpen} handleClose={handleModalClose} message={"sent message"}/>
    </div>
  );
}

export default ContactForm;
