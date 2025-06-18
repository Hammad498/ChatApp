import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios.js";


const uploadImage= createAsyncThunk('image/upload',async(file,thunkAPI)=>{
    try {
        const user = JSON.parse(localStorage.getItem("chat-app-user"));
        const formData = new FormData();
         formData.append("image", file);
        const response=await API.post(`${import.meta.env.VITE_BACKEND_URL}/api/image/upload`,formData, {
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

      
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export default uploadImage