import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginRequest } from './authApi';
import { LoginPayload } from './authTypes';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginPayload) => {
    const response = await loginRequest(credentials);
    return response;
  }
);
