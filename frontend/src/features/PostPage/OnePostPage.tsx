import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStateOfPosts, selectStatusOfPosts} from "./PostPageSlice";
import {getPosts} from "./PostPageThunks";
import {useParams} from "react-router-dom";
import dayjs from "dayjs";
import {apiUrl} from "../../constants";
import CommentForm from "../../components/UI/CommentsForm/CommentsForm";
import {getComments} from "../Comments/CommentsThunks";
import {selectStateOfComments, selectStatusOfComments} from "../Comments/CommentsSlice";
import CommentBlock from "../../components/CommentBlock";
import dialogue from '../../assets/dialogue.png';
import {selectUser} from "../Users/UsersSlice";

const OnePostPage = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const posts = useAppSelector(selectStateOfPosts);
    const comments = useAppSelector(selectStateOfComments);
    const loading = useAppSelector(selectStatusOfPosts);
    const loadingComments = useAppSelector(selectStatusOfComments);
    const post = posts[0];

    useEffect(() => {
        dispatch(getPosts(id!));
    }, [dispatch, id])

    useEffect(() => {
        dispatch(getComments(id!));
    }, [dispatch, id])

    let ImgUrl = dialogue;

    if (post && post.image) {
        ImgUrl = apiUrl + post.image;
    }

    return (
        <Container>
            {loading && <CircularProgress/>}
            {post && <Container fixed>
                <Typography textAlign='center' variant='h3'>Post:</Typography>
                <Grid container gap={2}>
                    <Grid item xs={10}>
                        <Grid container>
                            <Grid item xs={4}>
                                <img
                                    height="200"
                                    src={ImgUrl}
                                    alt="post"
                                /></Grid>
                            <Grid item xs={8}>
                                <Typography gutterBottom variant="h5" component="div" textAlign='center'>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="text.black">
                                    {post.description}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" marginLeft='auto'>
                                    created at
                                    : {dayjs(post.datetime).format('YYYY.MM.DD HH:mm:ss')} by: {post.user.username}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>}{user && <CommentForm id={id!}/>}
            {loadingComments ? <CircularProgress/> :
                comments.map(el => <CommentBlock key={Math.random()} comment={el}/>)
            }
        </Container>);
};

export default OnePostPage;