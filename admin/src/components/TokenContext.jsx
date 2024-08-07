import React, { createContext, useState, useEffect } from 'react';
import {EMAILfailnotify} from "./Notify"

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {


      const [email, setEmail] = useState("")
  const [token, setNewToken] = useState("")
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState({})
  const [send,setSend]=useState(false)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
  }

  const handleSendOTP = async () => {
    setSend(true)
    if(email===""){
      EMAILfailnotify("Please enter email.")
      setSend(false)
      return
      
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email }),
        }
      )
      const data = await response.json()
      if (data.success) {
        setSend(false)
        setNewToken(data.token)
        setData(data)
        setSuccess(true)
      } else {
        setSend(false)
        EMAILfailnotify("Failed to send OTP to the given email.")
        
      }
    } catch (error) {
      setSend(false)
      EMAILfailnotify()
    }
  }

  
  const contextValue = {
   token,setNewToken,success,setSuccess,data,setData,handleEmailChange,handleSendOTP,send,setSend
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
