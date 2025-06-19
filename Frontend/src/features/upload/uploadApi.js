import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios.js";


const uploadImage= createAsyncThunk('image/upload',async(file,thunkAPI)=>{
    try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        console.log("User data from localStorage:", user);
        const formData = new FormData();
         formData.append("image", file);
         const backendURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

         console.log("User token:", user?.token);

        const response=await API.post(`${backendURL}/api/image/upload`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                 Authorization: `Bearer ${user.token}`,
                 "Content-Type": "multipart/form-data",
    },});
        
           const updatedUser = {
        ...user,
        avatarImage: response.data.avatarImage,
        isAvatarImageSet: true,
      };
      localStorage.setItem("chat-app-user", JSON.stringify(updatedUser));

      return {
        avatarImage: response.data.avatarImage,
        isAvatarImageSet: true,
      };
      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export default uploadImage