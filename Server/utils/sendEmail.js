const nodemailer = require("nodemailer");

function sendEmail(email) {
  var mail = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", // Your email id ( sender's email )
      pass: "", // Your password
    },
  });

  var mailOptions = {
    from: "abdullahtanveer008@gmail.com", // sender's email
    to: email, // receiver's email
    subject: "Reset Password Link - E-Wallet",
    text: `Please use the following link to reset your password: [link]
    If you did not request a password change, please feel free to ignore this message.
    If you have any comments or questions don&#8217;t hesitate to reach us at [ organization email or any portal for help ]`,
    // html: '<p>You requested for reset password, kindly use this <a href="http://localhost:5000/reset-password?token=' + token + '">link</a> to reset your password</p>'
  };

  mail.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw error;
    } else {
      return "sent";
    }
  });
}

module.exports = sendEmail;
