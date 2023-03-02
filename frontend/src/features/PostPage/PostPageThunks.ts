import {createAsyncThunk} from "@reduxjs/toolkit";
import {Post, PostData} from "../../types";
import axiosApi from "../../axios-api";
import {RootState} from "../../app/store";


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

export const newPost = createAsyncThunk<void, PostData,{state:RootState}>(
    'Posts/newPost',
    async (arg, {getState}) => {
        const user = getState().users.user;
        if (user){
            const formData = new FormData();
            formData.append('title', arg.title);
            formData.append('description', arg.description);
            if (arg.image) {
                formData.append('image', arg.image);
            }
            try {
                const response = await axiosApi.post('/posts', formData,{headers: {'Authorization': user.token}});
                return response.data
            } catch (e) {
                return  e;
            }
        }
    }
)