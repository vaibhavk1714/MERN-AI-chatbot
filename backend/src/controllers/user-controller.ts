import { Request, Response, NextFunction } from "express";
import { hash, compare } from 'bcrypt';
import User from "../models/User.js"

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //get all users from database
    try {
        console.log("get all users");
        const users = await User.find();
        return res.status(200).json({ message: "OK", users: users });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //create a new user
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.status(401).json({ message: "ERROR", cause: "User already exists" });
        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "OK", id: newUser._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    //login a user
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(200).json({ message: "ERROR", cause: "User does not exist" });
        }
        const isPasswordCorrect = await compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect password")
        return res.status(200).json({ message: "OK", id: existingUser._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message })
    }
}