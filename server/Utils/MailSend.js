
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASSWORD
  }
});



const sendMenuOrderMail = async ({ orderDetails }) => {
    const mailOptions = {
      from: process.env.NODE_MAILER_EMAIL,
      to: process.env.NODE_MAILER_ALERT_EMAIL,
      subject: 'New Menu Order',
      html: `
       <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
        <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <div style="background-color: #b3280b; padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px;">New Menu Order</h2>
          </div>
          <div style="padding: 20px;">
            <h3 style="margin-bottom: 20px; color: #b3280b;">Order Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.contact}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border: 1px solid #ddd;"><strong>Order:</strong></td>
                <td style="padding: 8px; border: 1px solid #ddd;">${orderDetails.order}</td>
              </tr>
            </table>
            <p style="font-size: 14px; color: #888; margin-top: 20px;">This is an automated message. Please do not reply to this email.</p>
          </div>
        </div>
      </div>

      `
    };
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  
  
  
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

};



// for sending mail for event booking
const sendEventBookingMail = async ({ bookingDetails }) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: process.env.NODE_MAILER_ALERT_EMAIL,
    subject: 'New Event Booking',
    html: `
     <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #b3280b; padding: 20px; text-align: center; color: white;">
          <h2 style="margin: 0; font-size: 24px;">New Event Booking</h2>
        </div>
        <div style="padding: 20px;">
          <h3 style="margin-bottom: 20px; color: #b3280b;">Booking Details:</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.contact}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;"><strong>Details:</strong></td>
              <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.message}</td>
            </tr>
          </table>
          <p style="font-size: 14px; color: #888; margin-top: 20px;">This is an automated message. Please do not reply to this email.</p>
        </div>
      </div>
    </div>

    `
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};



//for sending mail for table booking
const sendTableBookingMail = async ({ bookingDetails }) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: process.env.NODE_MAILER_ALERT_EMAIL,
    subject: 'New Table Booking',
    html: `
     <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #b3280b;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #b3280b; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0; font-size: 24px;">New Table Booking</h2>
    </div>
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px; color: #b3280b;">Booking Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.contact}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Email:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.email}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Date:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.reserveDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Time:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.reserveTime}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Total Guests:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.guestsNumber}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Table Id:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.tableId}</td>
        </tr>
      </table>
      <p style="font-size: 14px; color: #888; margin-top: 20px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</div>

    `
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


//for sending mail for room booking
const sendRoomBookingMail = async ({ bookingDetails }) => {
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: process.env.NODE_MAILER_ALERT_EMAIL,
    subject: 'New Room Booking',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #b3280b; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0; font-size: 24px;">New Room Booking</h2>
    </div>
    <div style="padding: 20px;">
      <h3 style="margin-bottom: 20px; color: #b3280b;">Booking Details:</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Full Name:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Contact:</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.contact}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Check In :</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.checkInDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Check Out :</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.checkOutDate}</td>
        </tr>
        <tr>
          <td style="padding: 8px; border: 1px solid #ddd;"><strong>Room Id :</strong></td>
          <td style="padding: 8px; border: 1px solid #ddd;">${bookingDetails.roomId}</td>
        </tr>
      </table>
      <p style="font-size: 14px; color: #888; margin-top: 20px;">This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</div>

    `
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });



  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};


//for sending mail for reset opt code
const sendOtp = async({email, codeSix}) => {
  
  const mailOptions = {
    from: process.env.NODE_MAILER_EMAIL,
    to: email,
    subject: 'Reset Password Code',
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; margin: 0; padding: 0; background-color: #f9f9f9;">
  <div style="max-width: 600px; margin: 20px auto; background-color: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background-color: #b3280b; padding: 20px; text-align: center; color: white;">
      <h2 style="margin: 0; font-size: 24px;">Reset Password Code</h2>
    </div>
    <div style="padding: 20px;">
      <p>Dear <b>User</b>, you have requested to reset your password, here is the OTP for password reset.</p>
      <h3 style="margin-bottom: 20px; color: #b3280b;">OTP Code:</h3>
      <h2 style="color: #b3280b;">${codeSix}</h2>
      <p>Use this code to reset your password. This code will expire in 5 minutes.</p>
      <p style="font-size: 14px; color: #888; margin-top: 20px;">Please do not share this code with others.</p>
    </div>
  </div>
</div>

        `
      };
      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
  





module.exports = {
    sendMenuOrderMail,
    sendEventBookingMail,
    sendTableBookingMail,
    sendRoomBookingMail,
    sendOtp
}