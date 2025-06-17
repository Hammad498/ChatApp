import bcrypyt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const generateTokenandSetCookie = (user, res) => {
    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '10h' });

    // Set the token in a cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        maxAge: 10 * 60 * 1000 // 10 hours in milliseconds
    });

    return token;
}

