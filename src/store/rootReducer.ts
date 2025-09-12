import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
// import userReducer from '../features/user/userSlice'; // quando tiver mais slices

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer,
});

export default rootReducer;
