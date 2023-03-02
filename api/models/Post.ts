import mongoose from "mongoose";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Post = mongoose.model('Post', PostSchema);

export default Post;