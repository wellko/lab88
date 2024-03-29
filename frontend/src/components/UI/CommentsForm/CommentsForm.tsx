import React, {useState} from 'react';
import {Box, Container, TextField, Typography} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {CommentData} from "../../../types";
import {getComments, newComments} from "../../../features/Comments/CommentsThunks";
import {selectStatusOfPostingComments} from "../../../features/Comments/CommentsSlice";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

interface props {
    id: string
}

const CommentForm: React.FC<props> = ({id}) => {
    const dispatch = useAppDispatch();
    const posting = useAppSelector(selectStatusOfPostingComments);

    const initialState: CommentData = {
        description: '',
        post: id,
    }
    const [comment, setComment] = useState<CommentData>(initialState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setComment(prev => ({...prev, [name]: value}));
    };

    const postData = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(newComments(comment));
        setComment(initialState);
        await dispatch(getComments(id));
    }

    return (
        <Container>
            <Box border={2} borderRadius={2} borderColor='secondary.main' sx={{bgcolor: '#FFF'}} marginBottom={3}>
                <Typography variant='h4' textAlign='center'>Comment</Typography>
                <form onSubmit={postData}>
                    <TextField name='description' required fullWidth label="Message: " id="fullWidth"
                               onChange={onChange}
                               value={comment.description}
                               margin='normal'/>
                    <Box textAlign='center'>
                        <LoadingButton sx={{padding: '10px 40px'}} loading={posting} type='submit'
                                       variant='contained'>Post</LoadingButton>
                    </Box>
                </form>
            </Box>
        </Container>
    );
};

export default CommentForm;