import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {PopulatedComment} from "../../types";
import {getComments, newComments} from "./CommentsThunks";

interface Initial {
    comments: PopulatedComment[];
    loading: boolean;
    posting: boolean;
}

const initialState: Initial = {
    comments: [],
    loading: false,
    posting: false,
}

export const CommentsPageSlice = createSlice({
    name: 'Comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getComments.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getComments.fulfilled, (state, action) => {
            state.comments = action.payload;
            state.loading = false;
        })
        builder.addCase(getComments.rejected, (state) => {
            state.loading = false;
        })
        builder.addCase(newComments.pending, (state) => {
            state.posting = true;
        })
        builder.addCase(newComments.fulfilled, (state) => {
            state.posting = false;
        })
        builder.addCase(newComments.rejected, (state) => {
            state.posting = false;
        })
    }
})

export const CommentsPageReducer = CommentsPageSlice.reducer;
export const selectStateOfComments = (state: RootState) => state.comments.comments;
export const selectStatusOfComments = (state: RootState) => state.comments.loading;
export const selectStatusOfPostingComments = (state: RootState) => state.comments.posting;