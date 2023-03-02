import React from 'react';
import {PopulatedComment} from "../types";
import {Grid, Paper, Typography} from "@mui/material";
import dayjs from "dayjs";

interface props {
    comment: PopulatedComment
}

const CommentBlock:React.FC<props> = ({comment}) => {
    return (
        <Paper elevation={3} >
            <Grid container>
                <Grid item xs={4}>
                    <Typography color='text.secondary'>
                        createdAt {dayjs(comment.datetime).format('YYYY.MM.DD HH:mm:ss')}
                    </Typography>
                    <Typography color='text.secondary'>
                        Posted by : {comment.user.username}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography>{comment.description}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default CommentBlock;