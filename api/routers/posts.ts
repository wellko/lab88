import express = require("express");
import {imagesUpload} from "../multer";
import Post from "../models/Post";
import {PostData} from "../types";
import auth, {RequestWithUser} from "../middleware/auth";
import {Error} from "mongoose";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username').sort({'datetime': -1})
        return res.send(posts);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.get('/:id', async (req, res) => {
    try {
        const posts = await Post.find({_id: req.params.id}).populate('user', 'username')
        return res.send(posts);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.post('/', imagesUpload.single('image'), auth, async (req, res, next) => {
    const user = (req as RequestWithUser).user;
    const newPostData: PostData = {
        title: req.body.title,
        description: req.body.description ? req.body.description : '',
        image: req.file ? req.file.filename : null,
        user: user._id,
        datetime: Date.now(),
    }
    const post = new Post(newPostData);
    try {
        await post.save();
        return res.send(post);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

export default postsRouter;
