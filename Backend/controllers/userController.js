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



export const logOutUser=async(req,res)=>{
    try {
        if(!req.params.id) return res.json({ message: "user id is required" });
        // Clear the token cookie
        res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        onlineUsers.delete(req.params.id); // Assuming onlineUsers is a Set or Map tracking online users
       

        res.status(200).json({
            success:true,
            message:"User logged out successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to log out!",
            error
        })
    }
}
///////////////////////////////////////////


export const getAllUsers=async(req,res)=>{
    try {
        const user=await User.find({_id: {$ne: req.params.id}}).select([
            "email","username","_id","isAvatarImageSet","avatarImage"
            ]);

        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}
//////////////////////////////////////////////


export const setAvatar=async(req,res)=>{
   try {
     const userId=req.params.id;
    const avatarImage=req.body.image;
    if(!userId || !avatarImage){
        return res.status(400).json({ message: "User ID and avatar image are required" });
    }

    const user=await User.findByIdAndUpdate(userId,{
        isAvatarImageSet: true,
        avatarImage: avatarImage
    },{new: true});

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        isSet: user.isAvatarImageSet,
        image: user.avatarImage
    });
   } catch (error) {
    console.log("Error setting avatar:", error);
       return res.status(500).json({ message: "Error setting avatar", error: error.message });
    
   }
}