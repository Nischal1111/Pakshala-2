import React, { useState } from "react"
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material"

import { useNavigate, useParams } from "react-router-dom"
import {EMAILdonenotify, EMAILfailnotify} from "../components/Notify"
import { ToastContainer } from "react-toastify"

const OTP = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""))
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()
  const token = useParams().token

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling) {
      element.nextSibling.focus()
    }
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async () => {
    if (newPassword === confirmPassword) {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/verify-otp`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otpCode: otp.join(""),
              token: token,
              password: newPassword,
            }),
          }
        )
        const data = await response.json()
        if (data.success) {
          
          setTimeout(()=>{
            EMAILdonenotify("Your password have been changed successfully !!!")
          },1000)
          navigate("/login")
        } else {
          EMAILfailnotify("All field are required !!!"  )
        }
      } catch (error) {
        EMAILfailnotify("All field are required !!!"  )
      }
    } else {
      EMAILfailnotify("Both passwords must be same.")
    }
  }

  return (
    <Container maxWidth="sm">
      <ToastContainer/>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Enter OTP
        </Typography>
        <Typography variant="body1" gutterBottom>
          Enter the 6-digit OTP sent to your email.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 2,
            mb: 2,
          }}
        >
          {otp.map((data, index) => (
            <TextField
              key={index}
              type="text"
              name="otp"
              inputProps={{ maxLength: 1 }}
              value={data}
              onChange={(e) => handleOtpChange(e.target, index)}
              onFocus={(e) => e.target.select()}
              sx={{ width: "3rem", marginRight: 1, textAlign: "center" }}
            />
          ))}
        </Box>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={newPassword}
          onChange={handleNewPasswordChange}
        />
        <TextField
          label="Confirm Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  )
}

export default OTP