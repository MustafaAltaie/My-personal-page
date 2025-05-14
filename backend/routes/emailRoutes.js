import express from 'express';
import { Resend } from 'resend';
const router = express.Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post('/send', async (req, res) => {
    const { name, email, message } = req.body;

    try {
      const response = await resend.emails.send({
        from: 'contact@mustafaaltaie.uk',
        to: 'mustafaphoto111@gmail.com',
        reply_to: email,
        subject: `New message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; font-size: 15px; line-height: 1.6;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message.replace(/<[^>]+>/g, '')}</p>
          </div>
        `,
      });

      res.status(200).json({ success: true, id: response.id });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
});
  
export default router;