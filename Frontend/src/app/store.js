import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from '../features/auth/authSlice.js';
import {uploadReducer} from '../features/upload/uploadSlice.js';



const store =configureStore({
    reducer:{
        auth:authReducer,
        upload:uploadReducer
    }
});

export default store;