import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import Comment from "../models/Comment";
import {Error} from "mongoose";
import {CommentData} from "../types";

const  commentsRouter = express.Router();

commentsRouter.post('/',auth , async (req, res, next)=>{
    const user = (req as RequestWithUser).user;
    const newComment: CommentData ={
        user: user._id,
        post: req.body.post,
        description: req.body.description,
        datetime: Date.now(),
    }
    try {
        const comment = new Comment(newComment)
        await comment.save();
        return res.send(newComment);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }});


commentsRouter.get('/', async (req, res) => {
    const queryPost = req.query.post as string;
    let findParams = {};
    if (queryPost) {
        findParams = {post: queryPost};
    }
    try {
        const comment = await Comment.find(findParams).sort({'datetime': -1});
        return res.send(comment);
    } catch {
        return res.sendStatus(500);
    }
})

export default commentsRouter;