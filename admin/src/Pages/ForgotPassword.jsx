import React, { useContext, useState } from "react"
import { TextField, Button, Container, Typography, Box } from "@mui/material"
import { useNavigate, Link } from "react-router-dom"
import { TokenContext } from "../components/TokenContext"
import { ToastContainer } from "react-toastify"

const ForgotPassword = () => {
const {success,data,email,handleEmailChange,handleSendOTP,token,send}=useContext(TokenContext)

  return (
    <>
    <ToastContainer/>
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter your email address to receive an OTP.
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleEmailChange}
        />
        {!send ? (<Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSendOTP}
          sx={{ mt: 2 }}
        >
          Send OTP
        </Button>):<Button
          variant="contained"
          disabled
          fullWidth
          sx={{ mt: 2,color:"black",backgroundColor:"Gray" }}
        >
          Sending OTP...
        </Button> }
        
        {success && (
          <>
            <p style={{color:"#88D66C",marginTop:"1rem",fontSize:"1.2rem"}}>{data.message}</p>
            <Link to={`/create-new-password/${token}`}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Go to Next page
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Container>
    </>
  )
}

export default ForgotPassword
