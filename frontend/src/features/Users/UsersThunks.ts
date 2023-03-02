import { createAsyncThunk } from '@reduxjs/toolkit';
import { GlobalError, LoginMutation, RegisterMutation, RegisterResponse, User, ValidationError } from '../../types';
import { isAxiosError } from 'axios';
import axiosApi from "../../axios-api";
import {RootState} from "../../app/store";

export const register = createAsyncThunk<User, RegisterMutation, {rejectValue: ValidationError}>(
    'Users/register',
    async (registerMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users', registerMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as ValidationError);
            }
            throw e;
        }
    }
);

export const login = createAsyncThunk<User, LoginMutation, {rejectValue: GlobalError}>(
    'Users/login',
    async (loginMutation, {rejectWithValue}) => {
        try {
            const response = await axiosApi.post<RegisterResponse>('/users/sessions', loginMutation);
            return response.data.user;
        } catch (e) {
            if (isAxiosError(e) && e.response && e.response.status === 400) {
                return rejectWithValue(e.response.data as GlobalError);
            }
            throw e;
        }
    }
);

export const logoutApi = createAsyncThunk<void, void, {state: RootState}>(
    'users/logout',
    async (_, {getState}) => {
        const token = getState().users.user?.token;
        await axiosApi.delete('/users/sessions', {headers: {'Authorization': token}});
    }
);


