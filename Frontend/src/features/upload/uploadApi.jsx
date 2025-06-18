import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../utils/axios.js";


const uploadImage= createAsyncThunk(
  'upload/uploadImage',)