import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Box, Container, TextField} from "@mui/material";
import FileInput from "../../components/UI/FileInput/FileInput";
import {LoadingButton} from "@mui/lab";
import {useNavigate} from "react-router-dom";
import {PostData} from "../../types";
import {selectStatusOfPostingPosts} from "./PostPageSlice";
import {newPost} from "./PostPageThunks";

const NewsForm = () => {
    const dispatch = useAppDispatch();
    const posting = useAppSelector(selectStatusOfPostingPosts);
    const navigate = useNavigate();

    const initialState: PostData = {
        title: '',
        image: null,
        description: '',
    }
    const [post, setPost] = useState<PostData>(initialState);
    const [required, setRequired] = useState(false);

    useEffect(() => {
        if (post.image) {
            setRequired(false);
        } else if (post.description.length > 0) {
            setRequired(false);
        } else {
            setRequired(true);
        }
    }, [post.image, post.description, setRequired])

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setPost(prev => ({
                ...prev, [name]: files[0]
            }));
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setPost(prev => ({...prev, [name]: value}));
    };

    const postData = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(newPost(post));
        setPost(initialState);
        navigate('/');
    }

    return (
        <Container>
            <Box border={2} borderRadius={2} borderColor='secondary.main' sx={{bgcolor: '#FFF'}} marginBottom={3}>
                <form onSubmit={postData}>
                    <TextField name='title' required fullWidth label="Title: " id="fullWidth" onChange={onChange}
                               value={post.title}
                               margin='normal'/>
                    <TextField name='description' required={required} fullWidth label="Message: " id="fullWidth"
                               onChange={onChange}
                               value={post.description}
                               margin='normal'/>
                    <FileInput
                        label="Image"
                        name="image"
                        required={required}
                        onChange={fileInputChangeHandler}
                    />
                    <Box textAlign='center'>
                        <LoadingButton sx={{padding: '10px 40px'}} loading={posting} type='submit'
                                       variant='contained'>Post</LoadingButton>
                    </Box>

                </form>
            </Box>
        </Container>
    );
};

export default NewsForm;