import User from "../models/User.js";
import bcrypt from "bcrypt";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedpass = bcrypt.hashSync(req.body.password, salt);

    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpass,
        });
        const savedUser = await newUser.save();
        res.status(200).json(savedUser);
    } catch (err) {
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User Not Found"));

        const correctpwd = await bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!correctpwd)
            return next(createError(400, "Wrong password or username"));

        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT
        );

        const { password, isAdmin, ...otherdetails } = user._doc;

        res.cookie("access_token", token, {
            httpOnly: true,
        })
            .status(200)
            .json(otherdetails);
    } catch (err) {
        next(err);
    }
};
