import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_KEY = process.env.JWT_SECRET || "mern-task-secret-key";

const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_KEY);
            req.user = await User.findById(decoded._id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Not authorized, user not found'
                });
            }

            if (req.user.status !== "Enable") {
                return res.status(401).json({
                    success: false,
                    error: 'Account is disabled'
                });
            }

            next();
        } catch (error) {
            console.error('Auth middleware error:', error);
            return res.status(401).json({
                success: false,
                error: 'Not authorized, token failed'
            });
        }
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            error: 'Not authorized, no token provided'
        });
    }
};

export default authMiddleware;