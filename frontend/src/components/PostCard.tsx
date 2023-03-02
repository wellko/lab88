import React from 'react';
import {Post} from "../types";
import {Card, CardActionArea, CardContent, CardMedia, Typography} from "@mui/material";
import {apiUrl} from "../constants";
import {useNavigate} from "react-router-dom";
import dayjs from "dayjs";

interface state {
    post: Post,
}

const ArtistCard:React.FC<state> = ({post}) => {
    const ImgUrl = apiUrl + post.image;
    const navigate = useNavigate();
    const onClickNavigate = () => {
        navigate('/posts/' + post._id)
    };

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea onClick={onClickNavigate}>
                <CardMedia
                    component="img"
                    height="200"
                    image={ImgUrl}
                    alt="photo of post"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {post.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" marginLeft='auto'>
                        created at : {dayjs(post.datetime).format('YYYY.MM.DD HH:mm:ss')}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ArtistCard;