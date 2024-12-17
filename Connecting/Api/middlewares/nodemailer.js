import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Create a reusable transporter object using SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    // Use Gmail as the service (you can change this to other services)
    service: "gmail",

    // Authentication
    auth: {
      // Your email address
      user: process.env.EMAIL_USER,

      // App Password (not your regular email password)
      pass: process.env.EMAIL_PASS,
    },

    // Additional configuration for better email delivery
    secure: true,
    logger: true,
    debug: true,
  });
};

// Function to send password reset email
export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    // Create a transporter
    const transporter = createTransporter();

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || "Your App Name <noreply@yourapp.com>",
      to: email,
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Password Reset Request</h2>
          <p>You have requested to reset your password From Haho image generator website. Click the link below to reset:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" 
               style="background-color: #4CAF50; 
                      color: white; 
                      padding: 14px 25px; 
                      text-align: center; 
                      text-decoration: none; 
                      display: inline-block; 
                      border-radius: 5px;">
              Reset Password
            </a>
          </p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>This link will expire in 10 minutes.</p>
          <small>© ${new Date().getFullYear()} HaHo image Generator</small>
        </div>
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
    return info;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

// Verify transporter connection
export const verifyEmailTransport = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log("Email transport is ready to send emails");
    return true;
  } catch (error) {
    console.error("Email transport verification failed:", error);
    return false;
  }
};
