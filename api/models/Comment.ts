import mongoose, {Types} from "mongoose";
import Post from "./Post";
import User from "./User";

const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    user:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                validator: async (value: Types.ObjectId) => User.findById(value),
                message: 'User not founded!',
            }
        },
    post:  {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Post.findById(value),
            message: 'Post not founded!',
        }
    },
    description: {
        type: String,
        required: true
    },
    datetime: {
        type: Number,
        required: true
    }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;