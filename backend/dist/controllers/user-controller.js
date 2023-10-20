import User from "../models/User.js";
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
//# sourceMappingURL=user-controller.js.map