import express = require("express");
import {imagesUpload} from "../multer";
import Post from "../models/Post";
import {PostData} from "../types";

const postsRouter = express.Router();

postsRouter.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
        return res.send(posts);
    } catch {
        return res.sendStatus(500);
    }
});

postsRouter.post('/', imagesUpload.single('image'), async (req,res) => {
    const newPostData: PostData = {
        title: req.body.title,
        description: req.body.description? req.body.description: '',
        image: req.file ? req.file.filename : null,
    }
    const post = new Post(newPostData);
    try {
        await post.save();
        return res.send(post);
    } catch (error) {
        return res.status(400).send(error);
    }
});

export default  postsRouter;
