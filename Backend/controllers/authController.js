import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const JWT_KEY = process.env.JWT_SECRET || "mern-task-secret-key";

const generateToken = (user) => {
    return jwt.sign(
        { 
            _id: user._id, 
            email: user.email, 
            name: user.name 
        }, 
        JWT_KEY, 
        { expiresIn: "30d" }
    );
};
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log("register() | Started | email: " + email);
            
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide name, email and password"
            });
        }
        
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: "User already exists with this email"
            });
        }

        const user = new User({
            name,
            email: email.toLowerCase(),
            password
        });

        await user.save();
        const token = generateToken(user);
        res.status(201).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            error: "Server error during registration"
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("login() | Started | email: " + email);
        
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password"
            });
        }

        
        const user = await User.findOne({ email: email.toLowerCase() });
        
        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        if (user.status !== "Enable") {
            return res.status(401).json({
                success: false,
                error: "Account is disabled"
            });
        }
        const isMatch = await user.matchPassword(password);
           if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        const token = generateToken(user);
            res.status(200).json({
            success: true,
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            error: "Server error during login"
        });
    }
};


const verify = (req, res) => {
    console.log("verify() | Started | user: " + req.user.email);
    return res.status(200).json({
        success: true, 
        user: req.user
    });
};

export { register, login, verify };