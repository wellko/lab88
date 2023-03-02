import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axios-api";
import {CommentData, CommentItem, PopulatedComment} from "../../types";
import {RootState} from "../../app/store";

export const getComments = createAsyncThunk<PopulatedComment[], void, { state: RootState }>(
    'Comments/getAll',
    async (_, {getState}) => {
        const user = getState().users.user;
        if (user) {
            try {
                const response = await axiosApi.get('/comments/', {headers: {'Authorization': user.token}});
                return response.data;
            } catch(e)
                {
                    return e;
                }
            }
        })

export const newComments = createAsyncThunk<void, CommentData, { state: RootState }>(
    'Comments/newComm',
    async (arg, {getState}) => {
        const user = getState().users.user;
        if (user) {
            try {
                const response = await axiosApi.post('/comments/', arg,{headers: {'Authorization': user.token}});
                return response.data;
            } catch(e)
            {
                return e;
            }
        }
    })