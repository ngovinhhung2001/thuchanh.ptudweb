const ApiError = require("../api-error");
const UserService = require("../services/user.service");
const { client } = require("../utils/mongodb.util");
const MongoDB = require("../utils/mongodb.util");

exports.signIn = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findByEmail(req.body?.email);
    if (user.length == 0) {
        return next(new ApiError(400, "User not found!"));
    } else if (user[0].password != req.body?.password) {
        return next(new ApiError(400, "Password not match!"));
    } else {
        return res.send({ message: "Sign in Successfull" });
    }
}

exports.signUp = async (req, res, next) => {
    const userService = new UserService(MongoDB.client);
    const user = await userService.findByEmail(req.body?.email);

    if (user.length != 0) {
        return next(new ApiError(400, "User has existed!"));
    } else if (!req.body?.email) {
        return next(new ApiError(400, "Email cannot be empty!"));
    } else if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty!"));
    } else if (!req.body?.password) {
        return next(new ApiError(400, "Password cannot be empty!"));
    } else if (!req.body?.phone) {
        return next(new ApiError(400, "Phone number cannot be empty!"));
    } else if (req.body?.password.length < 8) {
        return next(new ApiError(400, "Password must have more than 8 characters!"));
    } else if (req.body?.password != req.body?.confirm_password) {
        return next(new ApiError(400, "Confirm Password must match with Password!"));
    } else if (req.body?.phone.length != 10) {
        return next(new ApiError(400, "Phone number must have 10 numbers!"));
    }

    try {
        const document = await userService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating the contact"));
    }
}