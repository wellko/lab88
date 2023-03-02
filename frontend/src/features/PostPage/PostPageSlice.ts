import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {Post} from "../../types";
import {getPosts} from "./PostPageThunks";

interface Initial {
    posts: Post[];
    loading: boolean;
}

const initialState: Initial = {
    posts: [],
    loading: false,
}

export const PostsPageSlice = createSlice({
    name: 'Posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPosts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getPosts.fulfilled, (state,action) => {
            state.posts = action.payload;
            state.loading = false;
        })
        builder.addCase(getPosts.rejected, (state) => {
            state.loading = false;
        })
    }
})

export const PostsPageReducer = PostsPageSlice.reducer;
export const selectStateOfPosts = (state: RootState) => state.posts.posts;
export const selectStatusOfPosts = (state: RootState) => state.posts.loading;