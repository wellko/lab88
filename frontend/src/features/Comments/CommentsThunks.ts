import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios-api";
import {CommentData, PopulatedComment} from "../../types";
import {RootState} from "../../app/store";

export const getComments = createAsyncThunk<PopulatedComment[], string>(
    'Comments/getAll',
    async (arg) => {
        try {
            const response = await axiosApi.get('/comments?post=' + arg);
            return response.data;
        } catch (e) {
            return e;
        }
    })

export const newComments = createAsyncThunk<void, CommentData, { state: RootState }>(
    'Comments/newComm',
    async (arg, {getState}) => {
        const user = getState().users.user;
        if (user) {
            try {
                const response = await axiosApi.post('/comments/', arg, {headers: {'Authorization': user.token}});
                return response.data;
            } catch (e) {
                return e;
            }
        }
    })