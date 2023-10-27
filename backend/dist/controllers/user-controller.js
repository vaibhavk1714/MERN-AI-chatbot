import { hash, compare } from 'bcrypt';
import User from "../models/User.js";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    //get all users from database
    try {
        console.log("get all users");
        const users = await User.find();
        return res.status(200).json({ message: "OK", users: users });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userSignup = async (req, res, next) => {
    //create a new user
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        //check is user with same email is already present
        if (existingUser)
            return res.status(401).json({ message: "ERROR", cause: "User already exists" });
        //hash the password before storing to DB
        const hashedPassword = await hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        //remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        //create token and store cookie
        const token = createToken(newUser._id.toString(), newUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(201).json({ message: "OK", name: newUser.name, email: newUser.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
    //login a user
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        //check is user is present
        if (!existingUser)
            return res.status(200).json({ message: "ERROR", cause: "User does not exist" });
        //validate the hashed password
        const isPasswordCorrect = await compare(password, existingUser.password);
        if (!isPasswordCorrect)
            return res.status(403).send("Incorrect password");
        //remove any existing cookies
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",
        });
        //create token and store cookie
        const token = createToken(existingUser._id.toString(), existingUser.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });
        return res.status(200).json({ message: "OK", name: existingUser.name, email: existingUser.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not registered or Token malfunction...");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match...");
        }
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res.status(401).send("User not registered or Token malfunction...");
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permissions did not match...");
        }
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: '/'
        });
        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};
//# sourceMappingURL=user-controller.js.map