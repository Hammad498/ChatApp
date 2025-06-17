import mongoose from "mongoose";
import { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3,
        max:20
    },
    email:{
        type:String,
        required:true,
        unique:true,
        max:50,
    },
    password:{
        type:String,
        required:true,
        min:8,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false
    },
    avatarImage:{
        type:String,
        default:""
    }

})

//hash password before saving
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})

//method to generate JWT token
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return token;
};

//method to compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const User=mongoose.model("Users",userSchema);
export default User;