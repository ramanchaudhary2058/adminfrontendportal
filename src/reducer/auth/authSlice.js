import { createSlice } from "@reduxjs/toolkit";
import { inputProfile, loginUser, registerUser } from "./authAction";


const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        registerdata:null,
        error:null,
    },
    reducers:{
        logout:(state)=>{
            state.user=null;
            localStorage.removeItem("authToken")
        }
    },
   extraReducers:(builder)=>{
    builder.addCase(loginUser.pending,(state,action)=>{
        state.loading=true;
        state.error=null;
    }).addCase(loginUser.fulfilled,(state,action)=>{
   
        state.user=action.payload;
        state.loading=false;
    }).addCase(loginUser.rejected,(state,action)=>{
      
        state.error=action.payload;
        state.loading=false;
    }).addCase(inputProfile.pending,(state,action)=>{
        state.loading=true;
        state.error=null;
    }).addCase(inputProfile.fulfilled,(state,action)=>{
   
        state.user=action.payload;
        state.loading=false;
    }).addCase(inputProfile.rejected,(state,action)=>{
      
        state.error=action.payload;
        state.loading=false;
    }) .addCase(registerUser.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        }).addCase(registerUser.fulfilled,(state,action)=>{
        
            state.registerdata=action.payload;
            state.loading=false;
        }).addCase(registerUser.rejected,(state,action)=>{
          
            state.error=action.payload;
            state.loading=false;
        })
}
})
export const {logout}=authSlice.actions;
export default authSlice.reducer
