import mongoose, {HydratedDocument, Types} from "mongoose";
import User from "./User";
import {PostData} from "../types";

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<PostData>) {
                return Boolean(this.image || this.description);
            },
            message: 'at least one of description or image field must be fielded',
        }
    },
    image: {
        type: String,
        validate: {
            validator: function (this: HydratedDocument<PostData>) {
                return Boolean(this.image || this.description)
            },
            message: 'at least one of description or image field must be fielded',
        }
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