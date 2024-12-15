import { ServerClient } from 'postmark';

// Initialize the Postmark client with the API key from environment variable
const client = new ServerClient(process.env.POSTMARK_API_KEY);

export default async function handler(req, res) {
  console.log('API is being hit!'); 
  if (req.method === 'POST') {
    const { email } = req.body;  // The email provided in the request body

    // Ensure the user's email is valid
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' });
    }

    try {
      // Sending email using Postmark
      await client.sendEmail({
        From: 'tdd2632@rit.edu',  // Your verified email in Postmark
        To: email,  // Send the email to the user's email input
        Subject: 'New Purchase Email',
        TextBody: `New purchase with email: ${email}`,
      });

      // Return success message
      return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      // Log error and send response with failure
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email. Please try again.' });
    }
  } else {
    // If method is not POST, return Method Not Allowed
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
