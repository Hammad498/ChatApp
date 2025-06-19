import { createSlice } from "@reduxjs/toolkit";
import { registeruser, loginUser, logOutUser, getAllUsers,setAvatar } from "./authApi.js";


const authSlice=createSlice({
    name:"auth",
    initialState:{
        user: null,
        users: [],
        isLoading: false,
        error: null,
    
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(registeruser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(registeruser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.error = null;
        })

        .addCase(registeruser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })


        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })


        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.user = action.payload.user;
            state.error = null;
        })


        .addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })


        .addCase(logOutUser.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(logOutUser.fulfilled,(state)=>{
            state.isLoading = false;
            state.user = null;
            state.error = null;
        })


        .addCase(logOutUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })


        .addCase(getAllUsers.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(getAllUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.users = action.payload.users;
            state.error = null;
        })

        .addCase(getAllUsers.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        .addCase(setAvatar.pending,(state)=>{
            state.isLoading = true;
            state.error = null;
        })

        .addCase(setAvatar.fulfilled,(state,action)=>{
            state.isLoading = false;
            if (state.user) {
                state.user.avatarImage = action.payload.avatarImage;
                state.user.isAvatarImageSet = true;
            }
            state.error = null;
        })

        .addCase(setAvatar.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })


    }
})

export const authReducer=authSlice.reducer;