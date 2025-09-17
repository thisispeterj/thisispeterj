require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = process.env.PORT || 3000;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;

app.use(bodyParser.json());

// Initialize SendGrid with API key
sgMail.setApiKey(SENDGRID_API_KEY);

// Endpoint to send emails
app.post("/send-email", (req, res) => {
	const { name, email, message } = req.body;

	const msg = {
		to: "thisispeterj+test@gmail.com", // Replace with your recipient's email address
		from: "thisispeterj@gmail.com", // Replace with your verified SendGrid sender email address
		subject: "New message from your website",
		text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
	};

	sgMail
		.send(msg)
		.then(() => res.status(200).json({ success: true }))
		.catch((err) => {
			console.error("Error sending email:", err);
			res.status(500).json({ success: false, error: "Error sending email" });
		});
});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
