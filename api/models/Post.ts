import mongoose, {Types} from "mongoose";
import User from "./User";

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
    },
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
    datetime: {
        type: Number,
        required: true,
    },
});

const Post = mongoose.model('Post', PostSchema);

export default Post;