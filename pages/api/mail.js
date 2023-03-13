const SparkPost = require("sparkpost");
const client = new SparkPost(process.env.SPARKPOST_KEY, { origin: process.env.SPARKPOST_ORIGIN });

export default async function handler(req, res) {
	// accept only POST requests
	if (req.method !== "POST") {
		res.status(400).json({
			statusCode: 400,
			message: "Only POST method is allowed for this endpoint",
		});

		return false;
	}

	// parse body data
	try {
		var { firstname, lastname, mobile, email, company, message, captcha } = JSON.parse(req.body);
	} catch (error) {
		res.status(400).json({
			statusCode: 400,
			message: "Invalid JSON body data",
		});

		return false;
	}

	// validate captcha
	try {
		const url = "https://www.google.com/recaptcha/api/siteverify";
		const options = {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: `secret=${process.env.CAPTCHA_SECRET_KEY}&response=${captcha}`,
		};

		const googleResponse = await fetch(url, options);
		const googleResponseJSON = await googleResponse.json();

		if (!googleResponseJSON.success) {
			throw new Error("Invalid Captcha");
		}
	} catch (error) {
		res.status(400).json({
			error,
			message: "Invalid Captcha",
		});

		return false;
	}

	// send mail
	const html = `
    <html>
    <body style="text-align: left;">
    <table>
    <tr>
    <th>From: ${firstname} ${lastname}</th>
    </tr>
  
    <tr>
    <th>Email: ${email}</th>
    </tr>
    
    <tr>
    <th>Mobile: ${mobile}</th>
    </tr>
  
    <tr>
    <th>Company: ${company}</th>
    </tr>
  
    <tr>
    <th>Message: ${message}</th>
    </tr>
    </table>
    </body>
    </html>
    `;

	try {
		await client.transmissions.send({
			content: {
				from: "contact@apieda.al",
				subject: "New message from apieda.al site contact form",
				html,
			},
			recipients: [{ address: process.env.MAIN_MAIL || "klaididingu@gmail.com" }],
		});

        res.status(200).json({ success: true });
	} catch (error) {
		res.status(error.statusCode).json(error);
	}
}
