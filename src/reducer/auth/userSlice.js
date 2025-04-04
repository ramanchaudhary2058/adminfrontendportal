import { createSlice } from "@reduxjs/toolkit";
import { fetchAllBacthes, fetchAllUsers} from "./authAction";
const initialQueryState={
    filters:{
      name:'',
      batch:''
    },
    sort:JSON.stringify({createdAt:-1}),
    limit:10,
  }
const userSlice=createSlice({
    name:"userdata",
    initialState:{
        allUser:[],
        loading:false,
        error:null,
        batch:[],
        query:{}
      
    }, reducers: {
        setLimit:(state,action)=>{
          state.query.limit=action.payload;
        },
        setSort:(state,action)=>{
          state.query.sort=action.payload;
        },
        setFilters:(state,action)=>{
       
          state.query.filters={...state.query.filters,...action.payload};
        },
        resetQuery:(state)=>{
          state.query=initialQueryState;
        }
  },
    extraReducers:(builder)=>{
        builder.addCase(fetchAllUsers.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchAllUsers.fulfilled,(state,action)=>{
   
            state.allUser=action.payload;
            state.loading=false;
        }).addCase(fetchAllUsers.rejected,(state,action)=>{
          
            state.error=action.payload;
            state.loading=false;
        }).addCase(fetchAllBacthes.pending,(state,action)=>{
            state.loading=true;
            state.error=null;
        }).addCase(fetchAllBacthes.fulfilled,(state,action)=>{
   
            state.batch=action.payload;
            state.loading=false;
        }).addCase(fetchAllBacthes.rejected,(state,action)=>{
          
            state.error=action.payload;
            state.loading=false;
        })
       
       }
    
})
export const {setLimit,setFilters,setSort,resetQuery}=userSlice.actions
export default userSlice.reducer