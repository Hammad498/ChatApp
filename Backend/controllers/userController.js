import User from "../models/user.model.js";

export const registerUser = async (req, res) => {
    const {username,email,password,confirmPassword} = req.body;
    if (!username || !email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = new User({
            username,
            email,
            password
        });

        await newUser.save();
        const token = newUser.generateAuthToken();
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                isAvatarImageSet: newUser.isAvatarImageSet,
                avatarImage: newUser.avatarImage
            },
            
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
//////////////////////////////////////////////
export const loginUser = async (req, res) => {
    const {email,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.find({email});
        if(!user){
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = user.generateAuthToken();
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAvatarImageSet: user.isAvatarImageSet,
                avatarImage: user.avatarImage
            },

            token: token
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

//////////////////////////////////////////////

export const logOutUser = async (req, res) => {
    try {
        // Clear the token cookie
        res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        
        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}