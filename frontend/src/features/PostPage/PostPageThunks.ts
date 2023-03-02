import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post} from "../../types";
import axiosApi from "../../axios-api";


export const getPosts = createAsyncThunk<Post[]>(
    'Posts/getAll',
    async () => {
        try{
            const response = await axiosApi.get('/posts');
            return response.data
        } catch (e) {
            return  e;
        }
    }
)