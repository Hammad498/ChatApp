import User from '../models/User.js';

export const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    
    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
        }
    
        // Create new user
        const newUser = new User({
        username,
        email,
        password,
        });
    
        // Save user to database
        await newUser.save();
    
        // Generate JWT token
        const token = newUser.generateAuthToken();
    
        res.status(201).json({ token, user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
}

export const loginUser = async (req, res) => {}