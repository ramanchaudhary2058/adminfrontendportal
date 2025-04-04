import { createAsyncThunk } from "@reduxjs/toolkit";
import {getAllCourses } from "../../api/course";

const fetchAllCourses=createAsyncThunk("auth/getallcourses",async(query,{rejectWithValue})=>{
    try {
       const response= await getAllCourses(query||{})
      
       return response.data
      
    } catch (error) {
        return rejectWithValue(error.response?.data)
        
    }
})
// const fetchAllBacthes=createAsyncThunk("auth/getall",async(_,{rejectWithValue})=>{
//     try {
//        const response= await getBatches()
      
//        return response.data
      
//     } catch (error) {
//         return rejectWithValue(error.response?.data)
        
//     }
// })
export {fetchAllCourses}