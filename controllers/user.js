import User from "../models/User.js";

export const updateUser = async(req, res, next) => {
    try {
        const updateduser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateduser);
    } catch (err) {
        next(err);
    }
}

export const deleteUser = async(req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("Deleted Successfully");
    } catch (err) {
        next(err);
    }
}

export const getUser = async(req, res, next) => {
    try {
        const getuser = await User.findById(req.params.id);
        res.status(200).json(getuser);
    } catch (err) {
        next(err);
    }
}

export const getUsers = async(req, res, next) => {
    try {
        const alluser = await User.find();
        res.status(200).json(alluser);
    } catch (err) {
        next(err);
    }
}