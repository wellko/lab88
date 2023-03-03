import React, {useCallback, useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfPosts, selectStatusOfPosts} from "./PostPageSlice";
import {getPosts} from "./PostPageThunks";
import PostCard from "../../components/PostCard";

const PostPage = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectStateOfPosts);
    const loading = useAppSelector(selectStatusOfPosts);

    const callBack = useCallback(async () => {
        await dispatch(getPosts());
    }, [dispatch])

    useEffect(() => {
        void callBack();
    }, [callBack])

    return (
        <Container fixed>
            <Typography textAlign='center' variant='h3'>Posts:</Typography>
            <Grid container gap={2}>
                {loading ? <CircularProgress/> :
                    posts.map(el => <PostCard key={Math.random()} post={el}/>)}
            </Grid>
        </Container>
    );
};

export default PostPage;