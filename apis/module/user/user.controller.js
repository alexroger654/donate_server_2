"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.handleUserLogin = exports.getUsers = exports.createUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const user_service_1 = require("./user.service");
//todo load from env
const SECRET_KEY = "your-secret-key-for-donate";
// ==================== create user ======================
const createUser = async (req, res, next) => {
    try {
        const data = req.body;
        const { email, password, role } = data;
        console.log('here ===================<', email, password, role);
        // ============== check if email, password and role are provided ===============
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email, password are required",
            });
        }
        // ============== check if user already exists===============
        const isExists = await (0, user_service_1.getUserByEmailFromDB)(email);
        if (isExists) {
            return res.status(400).json({
                status: "error",
                message: "User already exists",
            });
        }
        // ============== hash password ===============
        let hashedPassword;
        if (password) {
            hashedPassword = await bcrypt_1.default.hash(password, 15);
        }
        const user = await (0, user_service_1.createUserToDB)({ ...data, password: hashedPassword });
        res.status(200).json({
            status: "success",
            data: user?.email,
            message: "User created successfully",
        });
    }
    catch (err) {
        res.status(500).json({
            status: "error",
            message: `User creation failed ${err}`,
        });
    }
};
exports.createUser = createUser;
// ==================== get users ======================
const getUsers = async (req, res, next) => {
    const user = await (0, user_service_1.getUsersFromDB)();
    res.status(200).json({
        status: "success",
        data: user,
    });
};
exports.getUsers = getUsers;
// ==================== login ======================
const handleUserLogin = async (req, res, next) => {
    const data = req.body;
    const { email, password } = data;
    if (!email || !password) {
        return res.status(400).json({
            status: "error",
            message: "Email and password are required",
        });
    }
    const user = await (0, user_service_1.getUserByEmailFromDB)(email);
    if (!user) {
        return res.status(400).json({
            status: "error",
            message: "User not found",
        });
    }
    console.log(user);
    if (user) {
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        console.log("isMatch", isMatch);
        if (!isMatch) {
            return res.status(400).json({
                status: "error",
                message: "Password is incorrect",
            });
        }
        else {
            return res.status(200).json({
                status: "success",
                data: user,
            });
        }
    }
};
exports.handleUserLogin = handleUserLogin;
// ==================== Forgot Password ======================
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        // Check if the email exists in the database
        const user = await (0, user_service_1.getUserByEmailFromDB)(email);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Generate reset token with JWT
        const token = jsonwebtoken_1.default.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
        // Configure the transporter for Amazon SES SMTP
        const transporter = nodemailer_1.default.createTransport({
            host: "Server.sitegalleria.co",
            port: 465,
            secure: true,
            auth: {
                user: 'noreply@galleria.foundation',
                pass: 'Tq~42U=^Z23j*$bfFK]&1C#i',
            },
        });
        // Create the reset password link
        const resetLink = `https://galleria.foundation/reset-password?token=${token}`;
        // Define the email content
        const mailOptions = {
            from: "noreply@galleria.foundation",
            to: email,
            subject: "Password Reset Request",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password. The link will expire in 1 hour.</p>`,
        };
        // Send the reset password email
        await transporter.sendMail(mailOptions);
        // Respond to the client
        res.json({ message: "Password reset link sent to your email" });
    }
    catch (error) {
        console.error("Error during password reset:", error);
        res.status(500).json({ message: "Error sending email", error });
    }
};
exports.forgotPassword = forgotPassword;
// ==================== Reset Password ======================
const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = await (0, user_service_1.getUserByEmailFromDB)(decoded.email);
        if (!user) {
            return res.status(400).json({ message: "Invalid token" });
        }
        // Hash new password
        const password = await bcrypt_1.default.hash(newPassword, 10);
        await (0, user_service_1.updateUserPasswordInDB)(user.email, { password });
        res.json({ message: "Password reset successful" });
    }
    catch (error) {
        res.status(500).json({ message: "Invalid or expired token" });
    }
};
exports.resetPassword = resetPassword;
