import { combineReducers } from "@reduxjs/toolkit";
import headerReducer from './headerSlice'
import authReducer from './auth/authSlice'
import userReducer from './auth/userSlice'
import courseReducer from './courses/courseSlice'
const rootReducer=combineReducers({
    headerContent:headerReducer,
    auth:authReducer,
    userdata:userReducer,
    course:courseReducer
  },
)
export default rootReducer