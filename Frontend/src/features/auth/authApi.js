import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios.js";



export const registeruser=createAsyncThunk('auth/register',async(userData,thunkAPI)=>{
    try {
        const response=await API.post('/auth/register',userData);
        return response.data;

    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || "Registration failed",
            status: error.response?.status || 500
        });
    }
})

////////////////////////////////////////////


// export const loginUser=createAsyncThunk('auth/login',async(userData,thunkAPI)=>{
//     try {
//         const response=await API.post('/auth/login',userData);
//         console.log("API login payload:", userData);
//         console.log("API login response:", response.data);
//         return response.data;
//     } catch (error) {
//         return thunkAPI.rejectWithValue({
//             message: error.response?.data?.message || "Login failed",
//             status: error.response?.status || 500
//         });
        
//     }
// })

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await API.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      console.log("Login error response:", error.response?.data);
      return thunkAPI.rejectWithValue({
        message: error.response?.data?.message || "Login failed",
        status: error.response?.status || 500
      });
    }
  }
);


//////////////////////////////////////////////


export const logOutUser=createAsyncThunk('auth/logout',async(userId,thunkAPI)=>{
    try {
        const response=await API.get(`/auth/logout/${userId}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || "Logout failed",
            status: error.response?.status || 500
        });
    }
})


/////////////////////////////////////////////


export const getAllUsers=createAsyncThunk('auth/getAllUsers',async(userId,thunkAPI)=>{
    try {
        const response=await API.get(`/auth/get/${userId}`);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || "Failed to fetch users",
            status: error.response?.status || 500
        });
    }
});


////////////////////////////////////////////

export const setAvatar=createAsyncThunk('auth/setAvatar',async({userId,avatarImage},thunkAPI)=>{
    try {
        const formData = new FormData();
        formData.append('avatarImage', avatarImage);
        const response = await API.put(`/auth/setAvatar/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            message: error.response?.data?.message || "Failed to set avatar",
            status: error.response?.status || 500
        });
    }
});


