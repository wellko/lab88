import mongoose from 'mongoose';
import config from './config';
import User from "./models/User";
import Post from "./models/Post";
import Comment from "./models/Comment";

const run = async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(config.db);
    const db = mongoose.connection;
    try {
        await db.dropCollection('posts');
        await db.dropCollection('comments');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }
    const [user1, user2] = await User.create({
        password: "123",
        token: "sometoken",
        username: "Kwon"
    }, {
        password: "123",
        token: "sometoken12",
        username: "ContentMaker"
    });
    const [post1, post2] = await Post.create({
        user: user2._id,
        datetime: Date.now(),
        title: "earthquake",
        image: "images/7353cf7a-554f-4553-9d4d-e6c874f95e1e.jpg",
        description: "On Feb. 6, a magnitude 7.8 earthquake occurred in southern Turkey near the northern border of Syria. This quake was followed approximately nine hours later by a magnitude 7.5 earthquake located around 59 miles (95 kilometers) to the southwest."
    }, {
        user: user1._id,
        datetime: Date.now(),
        title: "I Like drink coffee",
        image: null,
        description: "Some Information about me"
    });

    await Comment.create({
        description: "so sad =(",
            datetime: Date.now(),
        post: post1._id,
        user: user1._id,
    },
        {
            description: "poor people",
            datetime: Date.now(),
            post: post1._id,
            user: user1._id,
        },
        {
            description: "we all trying to help them",
            datetime: Date.now(),
            post: post1._id,
            user: user2._id,
        },
        {
            description: "i mean all countries",
            datetime: Date.now(),
            post: post1._id,
            user: user2._id,
        },
        {
            description: "oh i like it",
            datetime: Date.now(),
            post: post1._id,
            user: user1._id,
        },
        {
            description: "Any one here?",
            datetime: Date.now(),
            post: post2._id,
            user: user1._id,
        },
        {
            description: "no one interested this post??",
            datetime: Date.now(),
            post: post2._id,
            user: user1._id,
        },
        {
            description: "please some one . . .",
            datetime: Date.now(),
            post: post2._id,
            user: user1._id,
        },
        {
            description: "oh this useless posts",
            datetime: Date.now(),
            post: post2._id,
            user: user2._id,
        },
        {
            description: "hello",
            datetime: Date.now(),
            post: post2._id,
            user: user1._id,
        },
        )
    await db.close();
};

run().catch(console.error);