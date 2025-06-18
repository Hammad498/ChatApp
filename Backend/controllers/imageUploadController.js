import User from "../models/user.model.js"


export const uploadImage=async(req,res)=>{
    const {userId}=req.body;
    if(!userId || !req.file){
        return res.status(400).json({message: "User ID and image file are required"});
    }

    try {
        const user=await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        
        user.avatarImage = req.file.path; 
        user.isAvatarImageSe = true;
        await user.save();
        return res.status(200).json({message: "Image uploaded successfully", avatarImage: user.avatarImage});


    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({message: "Error uploading image", error: error.message});
        
    }
}