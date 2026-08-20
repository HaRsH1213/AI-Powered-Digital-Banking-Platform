const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"AI-Powered Digital Banking Platform" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name){
  const subject = "Welcome to AI-Powered Digital Banking Platform";

  const text = `Hello ${name},

  Thank you for registering with AI-Powered Digital Banking Platform.

  We're excited to have you on board! Your account has been successfully created, and you can now access our digital banking services.

  Best regards,
  AI-Powered Digital Banking Platform Team`;

  const html = `
      <p>Hello ${name},</p>

      <p>
          Thank you for registering with 
          <strong>AI-Powered Digital Banking Platform</strong>.
      </p>

      <p>
          We're excited to have you on board! Your account has been 
          successfully created, and you can now access our digital 
          banking services.
      </p>

      <p>
          Best regards,<br>
          <strong>AI-Powered Digital Banking Platform Team</strong>
      </p>
  `;

  await sendEmail(userEmail, subject, text, html)
}
async function sendTransactionSuccessEmail(userEmail, name, amount, toAccount){
  
  const subject = "Transaction Successful - AI-Powered Digital Banking Platform";


  const text = `Hello ${name},
  Your transaction has been successfully processed.
  Transaction Details:
  Amount: ₹${amount}
  Transferred To: ${toAccount}
  Status: Successful

  The amount has been successfully transferred to the recipient account.

  If you did not authorize this transaction, please contact our support team immediately.

  Best regards,
  AI-Powered Digital Banking Platform Team`;

  const html = `
      <p>Hello <strong>${name}</strong>,</p>

      <p>
          Your transaction has been successfully processed.
      </p>

      <h3>Transaction Details</h3>

      <p>
          <strong>Amount:</strong> ₹${amount}
      </p>

      <p>
          <strong>Transferred To:</strong> ${toAccount}
      </p>

      <p>
          <strong>Status:</strong> Successful
      </p>

      <p>
          The amount has been successfully transferred to the recipient account.
      </p>

      <p>
          If you did not authorize this transaction, please contact our
          support team immediately.
      </p>

      <p>
          Best regards,<br>
          <strong>AI-Powered Digital Banking Platform Team</strong>
      </p>
  `;
  await sendEmail(userEmail, subject, text, html)
}


async function sendTransactionFailedEmail(userEmail, name, amount, toAccount) {
  
  const subject = "Transaction Failed - AI-Powered Digital Banking Platform";

  const text = `Hello ${name},


  Your transaction could not be processed successfully.

  Transaction Details:
  Amount: ₹${amount}
  Transferred To: ${toAccount}
  Status: Failed

  Unfortunately, your transaction could not be completed at this time.
  If any amount was deducted from your account, please wait for the amount to be automatically reversed or contact our support team.

  If you did not initiate this transaction, please contact our support team immediately.

  Best regards,
  AI-Powered Digital Banking Platform Team`;

  const html = `
      <p>Hello <strong>${name}</strong>,</p>

      <p>
          Unfortunately, your transaction could not be processed successfully.
      </p>

      <h3>Transaction Details</h3>

      <p>
          <strong>Amount:</strong> ₹${amount}
      </p>

      <p>
          <strong>Transferred To:</strong> ${toAccount}
      </p>

      <p>
          <strong>Status:</strong> Failed
      </p>

      <p>
          Your transaction could not be completed at this time.
          If any amount was deducted from your account, please wait for
          the amount to be automatically reversed or contact our support team.
      </p>

      <p>
          If you did not initiate this transaction, please contact our
          support team immediately.
      </p>

      <p>
          Best regards,<br>
          <strong>AI-Powered Digital Banking Platform Team</strong>
      </p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

module.exports = {sendRegistrationEmail,sendTransactionSuccessEmail, sendTransactionFailedEmail};