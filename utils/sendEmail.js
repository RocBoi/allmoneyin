import nodemailer from 'nodemailer';

export const sendConfirmationEmail = async (toEmail) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ionos.com', // or your SMTP provider
      port: 587,
      secure: false,
      auth: {
        user: 'gcode@atlquez.com',
        pass: 'your_email_password', // 🔐 replace with app password or SMTP password
      },
    });

    const info = await transporter.sendMail({
      from: '"RocBoi Quez Fanbase" <gcode@atlquez.com>',
      to: toEmail,
      subject: 'Subscription Confirmed - RocBoi Quez',
      html: `
        <h2>Welcome to the RocBoi Quez Official Community!</h2>
        <p>Thank you for subscribing. Stay tuned for exclusive drops, early NFT access, and fan-only surprises.</p>
        <p>— GCode Publishing</p>
      `,
    });

    console.log('Confirmation email sent: %s', info.messageId);
  } catch (error) {
    console.error('Failed to send confirmation email:', error);
  }
};
