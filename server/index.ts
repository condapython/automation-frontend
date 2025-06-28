import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
const nodemailer = require('nodemailer');
// import { saveLead } from './excel'; // <-- Disabled for now

const app = express();
const PORT = process.env.PORT ?? 3000;   // <-- use the port Render injects

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ?? '*', // allow your prod URL
  }),
);
app.use(bodyParser.json());

// put secrets in env vars – NEVER commit them
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post('/submit', async (req, res) => {
  console.log("Received data:", req.body);

  try {
    // saveLead(req.body);  // This saves to Excel (temporarily disabled)

    const { firstName, lastName, email, company, service, message } = req.body;

    const mailOptions = {
      from: `"Website Contact" <${process.env.GMAIL_USER}>`,
      to: ['dascam099@gmail.com', 'neerajkaushikkhandra181@gmail.com'],
      subject: 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Service Interest:</strong> ${service || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});