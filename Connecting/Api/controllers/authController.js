import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

import { sendPasswordResetEmail } from "../middlewares/nodemailer.js";

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }
    const salt = await bcrypt.genSalt(10);
    // hashed password
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ ...req.body, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(201).json({ user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    // we compare the password that th user enter to the one in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }
    // we generate a token for the cookie
    const { ...data } = user._doc; // provides the plain data of the user document from mongodb, making it easier to manipulate and return.
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.cookie("token", token).status(200).json(data); //Sets a Cookie: It attaches a cookie named "token" with the value of the token variable to the HTTP response.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logOut = async (req, res, next) => {
  try {
    // This method is used to remove a cookie from the client’s browser
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json({ message: "Logged out successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// this functin is used to refresh every time the page is reloaded
const refetch = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authorized." });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ message: "Not authorized." });
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.status(200).json({ user: user }); // providing the plain data of the user document from mongodb, making it easier to manipulate and return.
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token and store in database
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Set token expiration (10 minutes from now)
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // Construct reset password URL
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email (you'll need to configure nodemailer)
    // Send email using the new function
    // Note: This uses the user's email (from the input) as the recipient
    await sendPasswordResetEmail(user.email, resetURL);

    res.status(200).json({
      message: "Password reset link sent to your email",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ message: "Error processing password reset" });
  }
};

const resetPassword = async (req, res) => {
  // Password validation function
  const isValidPassword = (password) => {
    // Add your password strength requirements
    const minLength = 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return (
      password.length >= minLength &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    );
  };

  const { token, newPassword } = req.body;

  try {
    // Hash the received token to match database storage
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Validate new password strength
    if (!isValidPassword(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password does not meet requirements" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password" });
  }
};

export async function sendResetPasswordEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: "noreply@yourapp.com",
    to: email,
    subject: "Password Reset Request",
    html: `
      <p>You requested a password reset</p>
      <p>Click <a href="${resetLink}">here</a> to reset your password</p>
      <p>This link will expire in 1 hour</p>
    `,
  });
}

export { register, logIn, logOut, refetch, forgotPassword, resetPassword };
