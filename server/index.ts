import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
// FIX: Use require for nodemailer to avoid import issues in CommonJS/TypeScript setups
const nodemailer = require('nodemailer');
// import { saveLead } from './excel'; // <-- Disabled for now

const app = express();
const PORT = 3000;

// Allow requests from your frontend (update the port if needed)
app.use(cors({
  origin: 'http://localhost:5173'  // This must match the address of your frontend
}));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
  console.log("Received data:", req.body); // ✅ Shows data in Terminal

  try {
    // saveLead(req.body);  // This saves to Excel (temporarily disabled)

    // --- Email sending logic ---
    const { firstName, lastName, email, company, service, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'dascam099@gmail.com', // <-- your Gmail
        pass: 'izqz ycaq cldm dhyk', // <-- your Gmail App Password
      },
    });

    const mailOptions = {
      from: '"Website Contact" <dascam099@gmail.com>',
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