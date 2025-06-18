import uploadImage from "./uploadApi.js";
import { createSlice } from "@reduxjs/toolkit";


const uploadSlice=createSlice({
    name: "upload",
    initialState: {
        avatarImage: null,
        isAvatarImageSet: false,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(uploadImage.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            
        })

        .addCase(uploadImage.fulfilled, (state, action) => {
            state.loading = false;
            state.avatarImage = action.payload.avatarImage;
            state.isAvatarImageSet = true;
            state.success = true;
        })

        .addCase(uploadImage.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Failed to upload image";
            state.success = false;
        });


    }
})

export const uploadReducer = uploadSlice.reducer;