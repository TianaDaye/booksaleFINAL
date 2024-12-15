import nodemailer from 'nodemailer';  // Use ES Modules import

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Debugging (to make sure the environment variables are set)
    console.log("EMAIL_USER:", process.env.EMAIL_USER); 
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

    // Set up nodemailer transporter using environment variables
    const transporter = nodemailer.createTransport({
      service: 'gmail',  // Gmail service
      auth: {
        user: process.env.EMAIL_USER, // Your email address from environment variable
        pass: process.env.EMAIL_PASS, // Your email app password
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates (useful for development)
      },
      secure: true, // This ensures using SSL/TLS (secure connection)
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // The email address you want to send from
      to: 'nexus360llc@gmail.com', // Your private email to receive the purchase emails
      subject: 'New Purchase Email',
      text: `New purchase with email: ${email}`,  // The email content
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error);  // Log error
      return res.status(500).json({ error: 'Failed to send email' });
    }
  } else {
    // If method is not POST, return Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
