import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const recipientEmail =
  process.env.RECIPIENT_EMAIL ||
  process.env.CONTACT_EMAIL_TO ||
  'info@example.com';

const senderEmail =
  process.env.CONTACT_EMAIL_FROM ||
  'website@resend.dev';

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running'
  });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, subject, message'
      });
    }

    if (resend) {
      await resend.emails.send({
        from: `Amodera Contractors <${senderEmail}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `New contact form submission: ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto;">
            <h2 style="color:#0F5F9C;">New Enquiry Received</h2>

            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Subject:</strong> ${subject}</p>

            <hr>

            <p><strong>Message:</strong></p>
            <p>${message}</p>
          </div>
        `
      });
    } else {
      console.log("⚠️ Resend API key not configured.");
      console.log({
        name,
        email,
        phone,
        subject,
        message
      });
    }

    return res.status(200).json({
      success: true,
      message: "Your message has been sent successfully."
    });

  } catch (error) {
    console.error("Contact form error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "Unable to send your message."
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

export function startServer(port = process.env.PORT || 3000) {
  return app.listen(port, () => {
    console.log(`🚀 Amodera Contractors website running at http://localhost:${port}`);
    console.log(`📧 Contact API: http://localhost:${port}/api/contact`);
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  startServer();
}

export { app };
export default app;