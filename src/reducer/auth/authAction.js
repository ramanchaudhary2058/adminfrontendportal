import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers, getBatches,  login,fetchRegister, uploadProfileImage } from "../../api/auth";
const loginUser=createAsyncThunk("auth/login",async(data,{rejectWithValue})=>{
    try {
       const response= await login(data)
       localStorage.setItem("authToken",response.data?.token)
       return response.data;
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})
const registerUser=createAsyncThunk("auth/register",async(data,{rejectWithValue})=>{
    try {
       const response= await fetchRegister(data)
      
       return response.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})
const inputProfile=createAsyncThunk("auth/uploadprofile",async(formdata,{rejectWithValue})=>{
    try {
       const response= await uploadProfileImage(formdata)
      
       return response.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})

const fetchAllUsers=createAsyncThunk("auth/getallusers",async(query,{rejectWithValue})=>{
    try {
       const response= await getAllUsers(query||{})
      
       return response.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})
const fetchAllBacthes=createAsyncThunk("auth/getallbatches",async(_,{rejectWithValue})=>{
    try {
       const response= await getBatches()
      
       return response.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})
export {loginUser,registerUser,inputProfile,fetchAllUsers,fetchAllBacthes}