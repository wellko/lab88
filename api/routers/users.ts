import express from "express";
import User from "../models/User";
import {Error} from 'mongoose';

const usersRouter = express.Router();

usersRouter.post('/', async (req, res, next) => {
    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });
        user.generateToken();
        await user.save();
        return res.send(user);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            return res.status(400).send(error);
        }
        return next(error);
    }
});

usersRouter.post('/sessions', async (req, res) => {
    const user = await User.findOne({username: req.body.username});
    if (!user) {
        return res.status(400).send({error: 'Username not found'});
    }
    const isMatch = await user.checkPassword(req.body.password);
    if (!isMatch) {
        return res.status(400).send({error: 'Password is wrong'});
    }
    user.generateToken();
    await user.save();
    return res.send({message: 'Username and password correct!', user});
});

usersRouter.delete('/sessions', async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const success = {message: 'Success'};
        if (!token) return res.send(success);
        const user = await User.findOne({token});
        if (!user) return res.send(success);
        user.generateToken();
        await user.save();
        return res.send(success);
    } catch (e) {
        return next(e);
    }
});


export default usersRouter;